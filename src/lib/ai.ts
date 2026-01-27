// AI Service for analyzing children's artwork
// Supports: 智谱 GLM-4V (recommended), 通义千问 Qwen-VL, OpenAI GPT-4V

// 智谱 AI 配置 (推荐 - 免费额度多)
const ZHIPU_API_KEY = process.env.NEXT_PUBLIC_ZHIPU_API_KEY || '';
// 通义千问配置
const QWEN_API_KEY = process.env.NEXT_PUBLIC_QWEN_API_KEY || '';
// OpenAI 配置
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

export interface ArtworkAnalysis {
  description: string;        // 对画作的客观描述
  emotionPrompts: string[];   // 反思性提示问题
  childPerspective: string;   // 从孩子角度的可能想法
  memoryAnchors: string[];    // 这一刻的记忆锚点
}

const SYSTEM_PROMPT = `你是一个温暖、有同理心的助手，帮助父母保存孩子画作的记忆。

你的任务是：
1. 描述你在孩子画作中看到的内容（详细但温暖，关注色彩、形状、主题）
2. 提供3-4个情感提示，帮助父母表达他们此刻的感受
3. 想象孩子在画画时可能在想什么
4. 建议一段父母可能想写的真挚感受（要真实、触动人心）

用 JSON 格式回复，包含以下字段：
{
  "description": "对画作的温暖描述",
  "emotionPrompts": ["提示1", "提示2", "提示3", "提示4"],
  "childPerspective": "孩子画画时可能的想法",
  "suggestedFeeling": "一段真挚的父母感受示例"
}

请温暖、鼓励，关注情感价值而非艺术技巧。用中文回复。`;

// ============ 智谱 GLM-4V API ============
async function analyzeWithZhipu(imageBase64: string): Promise<ArtworkAnalysis> {
  console.log('🤖 Calling Zhipu GLM-4V API...');
  
  // 智谱API要求的格式：直接使用 base64 数据URL
  const imageUrl = imageBase64.startsWith('data:') 
    ? imageBase64 
    : `data:image/jpeg;base64,${imageBase64}`;
  
  // 智谱 GLM-4V 官方格式
  const requestBody = {
    model: 'glm-4v',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: imageUrl
            }
          },
          {
            type: 'text',
            text: `你是一个帮助记录孩子成长的助手。请客观分析这幅孩子的画作。

注意：不要替父母写感受，只提供客观描述和引导性问题。

请用JSON格式回复：
{
  "description": "客观描述画作内容（颜色、形状、主题、构图）",
  "emotionPrompts": [
    "引导父母思考的问题1（如：孩子画这幅画时是什么表情？）",
    "引导父母思考的问题2（如：这幅画让你想起了什么？）",
    "引导父母思考的问题3（如：孩子最近有什么变化？）",
    "引导父母思考的问题4（如：你希望未来的孩子知道什么？）"
  ],
  "childPerspective": "从孩子的视角，推测他/她画画时可能在想什么",
  "memoryAnchors": [
    "这一刻值得记住的细节1（如：孩子的专注神情）",
    "这一刻值得记住的细节2（如：特别的时间或场景）",
    "这一刻值得记住的细节3（如：孩子说的话）"
  ]
}
只返回JSON。`
          }
        ]
      }
    ]
  };

  console.log('📤 Sending request to Zhipu...');
  
  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ZHIPU_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  console.log('📥 Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Zhipu API error:', errorText);
    throw new Error(`Zhipu API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('✅ Zhipu API response received');
  
  return parseAIResponse(data.choices[0]?.message?.content);
}

// ============ 通义千问 Qwen-VL API ============
async function analyzeWithQwen(imageBase64: string): Promise<ArtworkAnalysis> {
  // 移除 data:image/xxx;base64, 前缀
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  
  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${QWEN_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'qwen-vl-plus',
      input: {
        messages: [
          {
            role: 'system',
            content: [{ text: SYSTEM_PROMPT }]
          },
          {
            role: 'user',
            content: [
              { text: '请分析这幅孩子的画作，帮助我记录这个珍贵的瞬间：' },
              { image: `data:image/jpeg;base64,${base64Data}` }
            ]
          }
        ]
      },
      parameters: {
        max_tokens: 1000,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Qwen API error: ${response.status}`);
  }

  const data = await response.json();
  return parseAIResponse(data.output?.choices?.[0]?.message?.content?.[0]?.text);
}

// ============ OpenAI GPT-4V API ============
async function analyzeWithOpenAI(imageBase64: string): Promise<ArtworkAnalysis> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: '请分析这幅孩子的画作：' },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`,
                detail: 'low'
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return parseAIResponse(data.choices[0]?.message?.content);
}

// ============ 解析 AI 响应 ============
function parseAIResponse(content: string | undefined): ArtworkAnalysis {
  if (!content) {
    throw new Error('Empty response from AI');
  }

  try {
    // 尝试提取 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        description: parsed.description || '',
        emotionPrompts: Array.isArray(parsed.emotionPrompts) ? parsed.emotionPrompts : [],
        childPerspective: parsed.childPerspective || '',
        memoryAnchors: Array.isArray(parsed.memoryAnchors) ? parsed.memoryAnchors : [],
      };
    }
  } catch (e) {
    console.error('Failed to parse AI response:', e);
  }

  throw new Error('Could not parse AI response');
}

// ============ 主函数：自动选择可用的 API ============
export async function analyzeArtwork(imageBase64: string): Promise<ArtworkAnalysis> {
  console.log('🎨 analyzeArtwork called');
  console.log('Image data length:', imageBase64?.length || 0);
  console.log('ZHIPU_API_KEY exists:', !!ZHIPU_API_KEY);
  console.log('QWEN_API_KEY exists:', !!QWEN_API_KEY);
  console.log('OPENAI_API_KEY exists:', !!OPENAI_API_KEY);

  // 优先使用智谱（免费额度最多）
  if (ZHIPU_API_KEY) {
    try {
      console.log('Using Zhipu GLM-4V API...');
      return await analyzeWithZhipu(imageBase64);
    } catch (error) {
      console.error('Zhipu API failed:', error);
    }
  }

  // 其次使用通义千问
  if (QWEN_API_KEY) {
    try {
      console.log('Using Qwen-VL API...');
      return await analyzeWithQwen(imageBase64);
    } catch (error) {
      console.error('Qwen API failed:', error);
    }
  }

  // 最后使用 OpenAI
  if (OPENAI_API_KEY) {
    try {
      console.log('Using OpenAI GPT-4V API...');
      return await analyzeWithOpenAI(imageBase64);
    } catch (error) {
      console.error('OpenAI API failed:', error);
    }
  }

  // 如果都没有配置，返回模拟数据
  console.log('No API key configured, using mock analysis');
  return getMockAnalysis();
}

// ============ 模拟数据（无 API Key 时使用）============
function getMockAnalysis(): ArtworkAnalysis {
  const mockResponses = [
    {
      description: '画面中有丰富的色彩和独特的构图。可以看到孩子运用了多种颜色，线条自由流畅，展现了独特的视觉表达方式。',
      emotionPrompts: [
        '💭 孩子画这幅画时是什么表情？专注、开心还是若有所思？',
        '👀 这幅画是在什么场景下完成的？',
        '💝 画中有什么细节是你第一眼注意到的？',
        '✨ 如果多年后再看这幅画，你希望记住这一刻的什么？',
      ],
      childPerspective: '孩子可能正沉浸在自己的想象世界中，每一笔都是内心故事的一部分。',
      memoryAnchors: [
        '📍 记录下此刻的时间和地点',
        '💬 孩子画画时说了什么？',
        '🎨 孩子自己如何描述这幅画？',
      ],
    },
    {
      description: '这幅画展现了孩子对色彩和形状的探索。用色大胆，构图有自己的逻辑，体现了这个年龄段独特的观察视角。',
      emotionPrompts: [
        '🌈 画中的颜色搭配让你想到什么？',
        '💫 孩子最近有什么成长让你印象深刻？',
        '🏠 这幅画完成的那个下午/晚上是怎样的？',
        '📝 孩子给这幅画起了什么名字？',
      ],
      childPerspective: '每一种颜色可能代表着一种心情，每一个形状都有它在孩子心中的特别意义。',
      memoryAnchors: [
        '⏰ 这是一个平常的日子还是特别的日子？',
        '👨‍👩‍👧 谁陪伴在孩子身边？',
        '🎵 当时的氛围是怎样的？',
      ],
    },
  ];

  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
