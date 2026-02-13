// 儿童友好的错误翻译系统
// 将编译器错误信息翻译成小朋友能理解的语言

interface ErrorTranslation {
  original: RegExp;
  kidFriendly: string;
  tip: string;
}

const errorTranslations: ErrorTranslation[] = [
  // 语法错误
  {
    original: /error: expected ';' before/i,
    kidFriendly: '好像少了分号（;）哦！',
    tip: '检查一下每句话后面有没有加 ; 这个小尾巴~'
  },
  {
    original: /error: expected '}' before/i,
    kidFriendly: '大括号（{}）没有配对好！',
    tip: '每个 { 都要有一个 } 和它对应，就像括号配对一样~'
  },
  {
    original: /error: expected ')' before/i,
    kidFriendly: '小括号（()）少了一个！',
    tip: '检查一下 ( 后面有没有对应的 ) ~'
  },
  {
    original: /error: expected primary-expression/i,
    kidFriendly: '这里好像少了点什么...',
    tip: '可能是一个变量名或者数字哦~'
  },
  {
    original: /error: '.*' was not declared in scope/i,
    kidFriendly: '这个变量好像还没定义呢！',
    tip: '用之前要先声明变量哦，比如：int x;'
  },
  {
    original: /error: invalid conversion/i,
    kidFriendly: '类型不匹配，不能这样转换！',
    tip: '比如不能把文字直接当成数字用哦~'
  },
  {
    original: /error: incompatible types/i,
    kidFriendly: '这两个类型不能一起用！',
    tip: 'int和string不能直接相加哦~'
  },
  {
    original: /error: 'cout' was not declared/i,
    kidFriendly: '要用 cout 输出，可别忘了头文件！',
    tip: '记得在最前面加 #include <iostream> 哦~'
  },
  {
    original: /error: 'cin' was not declared/i,
    kidFriendly: '要用 cin 读输入，别忘了头文件！',
    tip: '记得在最前面加 #include <iostream> 哦~'
  },
  // 逻辑错误
  {
    original: /warning: unused variable/i,
    kidFriendly: '这个变量声明了但没用，好浪费呀~',
    tip: '如果你不需要它，可以删掉哦~'
  },
  {
    original: /warning: variable is uninitialized/i,
    kidFriendly: '这个变量还没赋值就用啦！',
    tip: '先给它一个初始值吧，比如：int x = 0;'
  },
  // 其他常见错误
  {
    original: /error: redefinition of/i,
    kidFriendly: '这个变量已经定义过了，不能再定义！',
    tip: '换一个名字，或者看看之前是不是已经定义过了~'
  },
  {
    original: /error: 'main' must return 'int'/i,
    kidFriendly: 'main函数要返回一个整数！',
    tip: '在main函数最后加上 return 0; 哦~'
  },
  {
    original: /error: too few arguments to function/i,
    kidFriendly: '函数参数给少了！',
    tip: '检查一下函数需要几个参数~'
  },
  {
    original: /error: too many arguments to function/i,
    kidFriendly: '函数参数给多了！',
    tip: '函数不需要这么多参数哦~'
  },
  {
    original: /error: lvalue required as left operand/i,
    kidFriendly: '这个位置不能放等式左边！',
    tip: '只能给变量赋值，不能给数字或表达式赋值哦~'
  },
  {
    original: /error: division by zero/i,
    kidFriendly: '除数不能是0哦！',
    tip: '检查一下有没有除以0的情况~'
  },
  // 数组相关
  {
    original: /error: array subscript is not an integer/i,
    kidFriendly: '数组下标必须是整数！',
    tip: '下标不能用小数或者文字哦~'
  },
  {
    original: /error: out of range/i,
    kidFriendly: '数组下标超范围了！',
    tip: '数组大小是5的话，下标只能是0到4哦~'
  }
];

// 默认的儿童友好错误提示
const defaultTranslation: ErrorTranslation = {
  original: /.*/,
  kidFriendly: '程序遇到了一点小问题...',
  tip: '仔细看看错误提示，尝试修改一下代码吧！加油~ 💪'
};

export const translateError = (errorMessage: string): { message: string; tip: string } => {
  for (const translation of errorTranslations) {
    if (translation.original.test(errorMessage)) {
      return {
        message: translation.kidFriendly,
        tip: translation.tip
      };
    }
  }
  return {
    message: defaultTranslation.kidFriendly,
    tip: defaultTranslation.tip
  };
};

// 获取执行结果的消息（成功/失败）
export const getExecutionMessage = (success: boolean, output: string, expectedOutput: string): string => {
  if (success) {
    return '太棒了！程序运行成功！🎉';
  }

  if (output.trim() !== expectedOutput.trim()) {
    return '输出结果不太对哦，再试试吧！';
  }

  return '程序运行出错了，检查一下代码吧~';
};

// 成就解锁消息
export const getAchievementMessages = (achievementName: string): string => {
  const messages: Record<string, string> = {
    '初学乍练': '恭喜你完成了第一个关卡！这是你编程之路的起点~ 🌟',
    '循环大师': '你掌握了循环的魔法！太厉害了！🔄',
    '数组英雄': '数组对你来说已经小菜一碟了！📊',
    '排序巫师': '排序魔法已经被你征服！🧹',
    '小试牛刀': '你已经完成了10个关卡，进步真大！🏆'
  };

  return messages[achievementName] || `恭喜获得成就：${achievementName}！`;
};
