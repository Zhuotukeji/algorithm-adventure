import { Chapter, DailyChallenge } from '../types';

export const dailyChallenges: DailyChallenge[] = [
  {
    id: 'daily-1',
    date: new Date().toISOString().split('T')[0],
    title: '今日挑战：完美平方',
    description: '写一个程序，判断一个数是不是完全平方数',
    difficulty: 'medium',
    codeTemplate: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 判断 n 是不是完全平方数
    // 如果是，输出 "是"
    // 如果不是，输出 "否"

    return 0;
}`,
    solution: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;

    int sqrtN = sqrt(n);
    if (sqrtN * sqrtN == n) {
        cout << "是" << endl;
    } else {
        cout << "否" << endl;
    }

    return 0;
}`,
    testCases: [
      { input: '16', expectedOutput: '是', description: '16是完全平方数' },
      { input: '15', expectedOutput: '否', description: '15不是完全平方数' }
    ],
    rewards: { experience: 150, magicStones: 50 },
    completed: false
  },
  {
    id: 'daily-2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    title: '昨日挑战：数字反转',
    description: '反转一个三位数的各位数字',
    difficulty: 'easy',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 反转 n 的各位数字并输出
    // 例如：123 -> 321

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int a = n / 100;
    int b = (n / 10) % 10;
    int c = n % 10;

    cout << c * 100 + b * 10 + a << endl;

    return 0;
}`,
    testCases: [
      { input: '123', expectedOutput: '321', description: '反转123' }
    ],
    rewards: { experience: 100, magicStones: 30 },
    completed: true
  }
];

export const courseData: Chapter[] = [
  {
    id: 1,
    name: '魔法入门',
    description: '开始你的编程冒险，学习C++基础',
    icon: '✨',
    color: 'from-purple-500 to-pink-500',
    levels: [
      {
        id: '1-1',
        chapterId: 1,
        chapterName: '魔法入门',
        name: '你好，世界！',
        description: '学习如何在屏幕上输出文字',
        story: '欢迎，小法师！我是魔法导师奥兰多。现在你需要学会第一个魔法——让文字出现在屏幕上。在C++中，我们要使用"cout"来输出魔法咒语（文字）。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输出"Hello, Magic World!"来展示你的第一个魔法！'
        },
        difficulty: 'easy',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 在这里输出你的魔法咒语

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Magic World!" << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: 'Hello, Magic World!', description: '输出 Hello, Magic World!' },
          { input: '', expectedOutput: 'Hello', description: '输出 Hello' },
          { input: '', expectedOutput: 'Magic', description: '输出 Magic' }
        ],
        hints: [
          '使用 cout << 来输出文字',
          '记得用引号""包围你要输出的文字',
          '在句末加上 endl 表示换行'
        ],
        rewards: { experience: 50, magicStones: 10 }
      },
      {
        id: '1-2',
        chapterId: 1,
        chapterName: '魔法入门',
        name: '变量魔法盒',
        description: '学习使用变量存储数据',
        story: '奥兰多告诉你，每个法师都需要一个"魔法盒"来保存珍贵的东西。在编程中，我们使用变量来存储数据。变量就像一个贴了标签的盒子，我们可以把数据放进去，需要时再取出来。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个整数变量"age"，并把它设置为你的年龄，然后输出它！'
        },
        difficulty: 'easy',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 创建一个叫 age 的变量，值为 10

    // 输出 age 的值

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int age = 10;
    cout << age << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '10', description: '输出 age 的值' },
          { input: '', expectedOutput: '15', description: '变量值为15' },
          { input: '', expectedOutput: '20', description: '变量值为20' }
        ],
        hints: [
          '使用 "int" 来创建整数变量',
          '格式是：int 变量名 = 值;',
          '用 cout << 变量名 来输出变量的值'
        ],
        rewards: { experience: 60, magicStones: 15 }
      },
      {
        id: '1-3',
        chapterId: 1,
        chapterName: '魔法入门',
        name: '数字加法术',
        description: '学习整数运算',
        story: '魔法也需要数学！奥兰多教你如何用C++做加法运算。两个数相加可以变成一个新的数，这就是魔法的力量！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算 5 + 3 并输出结果！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 计算 5 + 3 并输出结果

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    cout << 5 + 3 << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '8', description: '输出 5+3 的结果' },
          { input: '', expectedOutput: '15', description: '输出 10+5 的结果' },
          { input: '', expectedOutput: '100', description: '输出 50+50 的结果' }
        ],
        hints: [
          '直接用 + 号进行加法运算',
          '可以用变量保存结果：int result = 5 + 3;'
        ],
        rewards: { experience: 70, magicStones: 20 }
      },
      {
        id: '1-4',
        chapterId: 1,
        chapterName: '魔法入门',
        name: '减法魔法',
        description: '学习整数减法运算',
        story: '奥兰多教你另一个基本运算——减法！就像从盒子里拿走东西一样，减法可以计算出剩下的数量。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算 10 - 3 并输出结果！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 计算 10 - 3 并输出结果

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    cout << 10 - 3 << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '7', description: '输出 10-3 的结果' },
          { input: '', expectedOutput: '5', description: '输出 8-3 的结果' },
          { input: '', expectedOutput: '20', description: '输出 50-30 的结果' }
        ],
        hints: [
          '直接用 - 号进行减法运算',
          '可以用变量保存结果：int result = 10 - 3;'
        ],
        rewards: { experience: 70, magicStones: 20 }
      },
      {
        id: '1-5',
        chapterId: 1,
        chapterName: '魔法入门',
        name: '乘法魔法',
        description: '学习整数乘法运算',
        story: '奥兰多展示了一个快速的运算——乘法！就像重复相加多次，乘法可以快速计算出总和。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算 6 × 7 并输出结果！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 计算 6 * 7 并输出结果

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    cout << 6 * 7 << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '42', description: '输出 6*7 的结果' },
          { input: '', expectedOutput: '20', description: '输出 4*5 的结果' },
          { input: '', expectedOutput: '100', description: '输出 10*10 的结果' }
        ],
        hints: [
          '用 * 号进行乘法运算',
          '可以用变量保存结果：int result = 6 * 7;'
        ],
        rewards: { experience: 70, magicStones: 20 }
      }
    ]
  },
  {
    id: 2,
    name: '魔法咒语格式',
    description: '学习C++语法规则',
    icon: '📜',
    color: 'from-blue-500 to-cyan-500',
    levels: [
      {
        id: '2-1',
        chapterId: 2,
        chapterName: '魔法咒语格式',
        name: '输入魔法',
        description: '学习从键盘获取输入',
        story: '奥兰多展示了一个新魔法——让用户告诉程序一些信息！我们可以用"cin"来获取用户的输入，就像法师读取水晶球里的信息一样。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '读取一个数字并输出它！'
        },
        difficulty: 'easy',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int num;
    // 使用 cin 获取用户输入的数

    // 输出这个数

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;
    cout << num << endl;
    return 0;
}`,
        testCases: [
          { input: '42', expectedOutput: '42', description: '读取并输出数字' }
        ],
        hints: [
          '使用 cin >> 变量 来获取输入',
          '输入输出方向不同：cin是进入，cout是出去'
        ],
        rewards: { experience: 80, magicStones: 25 }
      },
      {
        id: '2-2',
        chapterId: 2,
        chapterName: '魔法咒语格式',
        name: '两个数的加法',
        description: '学习处理多个输入',
        story: '现在你学会了读取输入，让我们来做更有挑战的事情——读取两个数并相加！这需要用到我们之前学的加法知识。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '读取两个数字，计算它们的和并输出！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // 读取两个数字

    // 计算 a + b 并输出

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
        testCases: [
          { input: '5 3', expectedOutput: '8', description: '计算两个数的和' },
          { input: '10 20', expectedOutput: '30', description: '计算两个数的和' }
        ],
        hints: [
          '可以连续使用 cin >> a >> b;',
          '最后输出 a + b'
        ],
        rewards: { experience: 90, magicStones: 30 }
      },
      {
        id: '2-3',
        chapterId: 2,
        chapterName: '魔法咒语格式',
        name: '多位数输入',
        description: '学习输入多位数字',
        story: '奥兰多告诉你，有时候我们需要处理更大的数字。让我学习如何读取和计算多位数字！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '读取三个整数，计算它们的和！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    // 读取三个整数

    // 计算它们的和并输出

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << a + b + c << endl;
    return 0;
}`,
        testCases: [
          { input: '1 2 3', expectedOutput: '6', description: '计算三个数的和' },
          { input: '10 20 30', expectedOutput: '60', description: '计算三个数的和' }
        ],
        hints: [
          '可以用 cin >> a >> b >> c; 连续读取',
          '输出 a + b + c'
        ],
        rewards: { experience: 90, magicStones: 30 }
      }
    ]
  },
  {
    id: 3,
    name: '简单的魔法',
    description: '学习条件判断',
    icon: '🔮',
    color: 'from-pink-500 to-red-500',
    levels: [
      {
        id: '3-1',
        chapterId: 3,
        chapterName: '简单的魔法',
        name: '判断魔法',
        description: '学习if条件语句',
        story: '奥兰多告诉你，魔法世界里有"如果...那么..."的规则。比如：如果天黑了就点灯。C++中的if语句就是用来做这种判断的！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '判断一个数是否大于10，如果是，输出"大数字"！'
        },
        difficulty: 'medium',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;

    // 判断 num 是否大于 10
    // 如果是，输出 "大数字"

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;

    if (num > 10) {
        cout << "大数字" << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '15', expectedOutput: '大数字', description: '大于10时输出' },
          { input: '5', expectedOutput: '', description: '不大于10时不输出' }
        ],
        hints: [
          '使用 if (条件) { ... } 结构',
          '条件可以是：> < >= <= == !=',
          '别忘了用双等号 == 表示相等'
        ],
        rewards: { experience: 100, magicStones: 35 }
      },
      {
        id: '3-2',
        chapterId: 3,
        chapterName: '简单的魔法',
        name: '双向选择',
        description: '学习if-else语句',
        story: '有时候我们需要做"二选一"的决定。比如：如果是晴天就去郊游，如果是雨天就在家看书。if-else就是处理这种情况的魔法！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '判断数字是奇数还是偶数，输出对应的结果！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;

    // 判断奇偶性
    // 如果是偶数，输出 "偶数"
    // 否则输出 "奇数"

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;

    if (num % 2 == 0) {
        cout << "偶数" << endl;
    } else {
        cout << "奇数" << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '4', expectedOutput: '偶数', description: '偶数判断' },
          { input: '7', expectedOutput: '奇数', description: '奇数判断' }
        ],
        hints: [
          '用 % 取余运算',
          '如果 num % 2 == 0，说明是偶数'
        ],
        rewards: { experience: 110, magicStones: 40 }
      },
      {
        id: '3-3',
        chapterId: 3,
        chapterName: '简单的魔法',
        name: '比较大小',
        description: '学习使用比较运算符',
        story: '奥兰多教你如何比较两个数的大小。这在很多情况下都很有用，比如找出两个数中更大的那个。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输入两个整数，输出较大的那个！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    // 输出较大的数

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    if (a > b) {
        cout << a << endl;
    } else {
        cout << b << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '5 3', expectedOutput: '5', description: '输出较大的数' },
          { input: '10 20', expectedOutput: '20', description: '输出较大的数' }
        ],
        hints: [
          '用 if-else 判断',
          '如果 a > b，输出 a，否则输出 b'
        ],
        rewards: { experience: 110, magicStones: 40 }
      }
    ]
  },
  {
    id: 4,
    name: '循环魔法',
    description: '学习循环结构',
    icon: '🔄',
    color: 'from-green-500 to-emerald-500',
    levels: [
      {
        id: '4-1',
        chapterId: 4,
        chapterName: '循环魔法',
        name: '重复的咒语',
        description: '学习for循环',
        story: '奥兰多展示了一个强大的魔法——让同样的咒语重复执行！比如你想输出1到5，使用循环只需要几行代码就能搞定。这就是for循环的力量！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '用循环输出1到5的数字！'
        },
        difficulty: 'medium',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 用 for 循环输出 1 到 5

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << endl;
    }
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1\n2\n3\n4\n5\n', description: '输出1到5' },
          { input: '', expectedOutput: '1\n2\n3\n', description: '输出1到3' },
          { input: '', expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n', description: '输出1到10' }
        ],
        hints: [
          'for循环格式：for(起始值; 条件; 步进)',
          'i++ 表示每次增加1',
          'cout << i 放在循环体里'
        ],
        rewards: { experience: 120, magicStones: 45 }
      },
      {
        id: '4-2',
        chapterId: 4,
        chapterName: '循环魔法',
        name: '求和魔法',
        description: '用循环计算总和',
        story: '现在你学会了循环，让我们用它来做一些有用的计算。比如计算1+2+3+...+10的总和。用循环可以轻松完成！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算1到10的和并输出！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    // 用循环把 1 到 10 加起来

    // 输出 sum

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        sum = sum + i;
    }

    cout << sum << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '55', description: '1到10的和' }
        ],
        hints: [
          '先设 sum = 0',
          '每次循环把 i 加到 sum 上',
          'sum = sum + i 可以写成 sum += i'
        ],
        rewards: { experience: 130, magicStones: 50 }
      },
      {
        id: '4-3',
        chapterId: 4,
        chapterName: '循环魔法',
        name: '数数游戏',
        description: '学习while循环',
        story: '奥兰多教你另一种循环——while循环！while循环就像一个哨兵，一直重复直到满足某个条件才停止。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '用while循环输出1到5！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int i = 1;

    // 用 while 循环输出 1 到 5

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int i = 1;

    while (i <= 5) {
        cout << i << endl;
        i++;
    }

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1\n2\n3\n4\n5\n', description: '输出1到5' }
        ],
        hints: [
          'while循环格式：while(条件){ 循环体 }',
          '记得在循环体里改变条件，否则会无限循环！',
          'i++ 让 i 越来越大，最终会超过5'
        ],
        rewards: { experience: 140, magicStones: 55 }
      },
      {
        id: '4-4',
        chapterId: 4,
        chapterName: '循环魔法',
        name: '乘法表',
        description: '双重循环训练',
        story: '你已经掌握了单层循环，现在让我们学习双重循环！就像时钟一样，分钟走完一圈，小时才走一格。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '用双重循环输出1到5的乘法表！'
        },
        difficulty: 'hard',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 用双重循环输出 1*1 到 5*5 的乘法表
    // 格式：
    // 1 2 3 4 5
    // 2 4 6 8 10
    // ...

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            cout << i * j << " ";
        }
        cout << endl;
    }
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1 2 3 4 5 \n2 4 6 8 10 \n3 6 9 12 15 \n4 8 12 16 20 \n5 10 15 20 25 \n', description: '输出5x5乘法表' }
        ],
        hints: [
          '需要两个for循环嵌套',
          '外层循环控制行，内层循环控制列',
          '输出 i*j 表示第i行第j列的值'
        ],
        rewards: { experience: 180, magicStones: 70 }
      },
      {
        id: '4-5',
        chapterId: 4,
        chapterName: '循环魔法',
        name: '阶乘计算',
        description: '用循环计算阶乘',
        story: '奥兰多教你一个有趣的数学问题——阶乘！5的阶乘就是5×4×3×2×1。让我用循环来计算！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输入一个数n，计算n的阶乘并输出！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 计算 n 的阶乘

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result = result * i;
    }
    cout << result << endl;
    return 0;
}`,
        testCases: [
          { input: '5', expectedOutput: '120', description: '计算5的阶乘' },
          { input: '3', expectedOutput: '6', description: '计算3的阶乘' }
        ],
        hints: [
          '阶乘是 1*2*3*...*n',
          '用循环从1乘到n',
          '注意0的阶乘是1'
        ],
        rewards: { experience: 150, magicStones: 50 }
      }
    ]
  },
  {
    id: 5,
    name: '数组宝库',
    description: '学习数组数据结构',
    icon: '📊',
    color: 'from-yellow-500 to-orange-500',
    levels: [
      {
        id: '5-1',
        chapterId: 5,
        chapterName: '数组宝库',
        name: '数字队列',
        description: '学习数组基础',
        story: '奥兰多给你看了一个神奇的盒子——数组！数组可以存放多个相同类型的数据，就像一排抽屉，每个抽屉有一个编号（索引）。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个包含5个数字的数组，并输出第一个和最后一个元素！'
        },
        difficulty: 'medium',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 1, 9, 4};

    // 输出第一个元素 arr[0]
    // 输出最后一个元素 arr[4]

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 1, 9, 4};

    cout << arr[0] << endl;
    cout << arr[4] << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '3\n4\n', description: '输出首尾元素' }
        ],
        hints: [
          '数组索引从0开始！',
          '第一个元素是 arr[0]',
          '最后一个元素是 arr[4]（因为有5个元素）'
        ],
        rewards: { experience: 140, magicStones: 55 }
      },
      {
        id: '5-2',
        chapterId: 5,
        chapterName: '数组宝库',
        name: '找最大值',
        description: '用数组解决实际问题',
        story: '让我们用数组来做一个有用的程序。法师们经常需要找出最大值来选择最强的魔法。现在你要写一个程序，找出一组数中的最大值！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '找出数组中的最大数并输出！'
        },
        difficulty: 'hard',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 1, 9, 4};
    int max = arr[0];

    // 用循环找出最大值

    // 输出 max

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 1, 9, 4};
    int max = arr[0];

    for (int i = 1; i < 5; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    cout << max << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '9', description: '最大值' }
        ],
        hints: [
          '先假设第一个是最大值',
          '遍历数组，如果发现更大的就更新max',
          '用 if (arr[i] > max)'
        ],
        rewards: { experience: 150, magicStones: 60 }
      },
      {
        id: '5-3',
        chapterId: 5,
        chapterName: '数组宝库',
        name: '数组求和',
        description: '用数组求总和',
        story: '数组不仅可以存储数据，还可以帮助我们处理大量数据！现在让我们用数组来计算一组数的总和。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算数组中所有元素的和！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int sum = 0;

    // 用循环计算数组所有元素的和

    // 输出 sum

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }

    cout << sum << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '150', description: '求和结果' }
        ],
        hints: [
          '用for循环遍历数组',
          'sum += arr[i] 等价于 sum = sum + arr[i]'
        ],
        rewards: { experience: 160, magicStones: 65 }
      },
      {
        id: '5-4',
        chapterId: 5,
        chapterName: '数组宝库',
        name: '找最小值',
        description: '在数组中找最小值',
        story: '奥兰多教你如何在数组中找出最小的数。这在比赛中找出最低分、找出最便宜的东西等情况下都很有用！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '找出数组中最小的数并输出！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 8, 1, 9};

    // 找出最小的数并输出

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 8, 1, 9};
    int min = arr[0];

    for (int i = 1; i < 5; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    cout << min << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1', description: '最小值是1' }
        ],
        hints: [
          '假设第一个是最小的',
          '用循环比较每个元素',
          '如果发现更小的就更新min'
        ],
        rewards: { experience: 160, magicStones: 65 }
      }
    ]
  },
  {
    id: 6,
    name: '排序秘籍',
    description: '学习基础排序算法',
    icon: '🧹',
    color: 'from-indigo-500 to-purple-500',
    levels: [
      {
        id: '6-1',
        chapterId: 6,
        chapterName: '排序秘籍',
        name: '冒泡排序',
        description: '学习冒泡排序算法',
        story: '奥兰多展示了一个古老而强大的排序魔法——冒泡排序！这个算法就像水里的气泡一样，较小的元素会慢慢"浮"到前面。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '实现冒泡排序，将数组按从小到大排序并输出！'
        },
        difficulty: 'hard',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[6] = {5, 2, 8, 1, 9, 3};
    int n = 6;

    // 实现冒泡排序

    printArray(arr, n);
    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[6] = {5, 2, 8, 1, 9, 3};
    int n = 6;

    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }

    printArray(arr, n);
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1 2 3 5 8 9 ', description: '排序结果' }
        ],
        hints: [
          '冒泡排序需要两层循环',
          '外层循环控制遍历次数',
          '内层循环比较相邻元素并交换'
        ],
        rewards: { experience: 200, magicStones: 80 }
      },
      {
        id: '6-2',
        chapterId: 6,
        chapterName: '排序秘籍',
        name: '选择排序',
        description: '学习选择排序算法',
        story: '奥兰多介绍另一种排序魔法——选择排序！选择排序就像从一堆牌里每次选出最小（或最大）的牌，按顺序排好。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '实现选择排序，将数组按从小到大排序！'
        },
        difficulty: 'hard',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[6] = {64, 25, 12, 22, 11};
    int n = 6;

    // 实现选择排序

    printArray(arr, n);
    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[6] = {64, 25, 12, 22, 11};
    int n = 5;

    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }

    printArray(arr, n);
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '11 12 22 25 64 ', description: '排序结果' }
        ],
        hints: [
          '选择排序：每次找出剩余部分的最小值',
          '记录最小值的位置minIdx',
          '循环结束后交换'
        ],
        rewards: { experience: 220, magicStones: 90 }
      },
      {
        id: '6-3',
        chapterId: 6,
        chapterName: '排序秘籍',
        name: '查找宝藏',
        description: '学习线性查找',
        story: '排序很重要，但有时候我们需要在混乱中寻找目标！奥兰多教你线性查找——就像在一堆玩具里一个个找自己想要的那个。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '在数组中查找数字7，如果找到输出"找到"！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {3, 7, 1, 9, 5, 7};
    int target = 7;

    // 用线性查找在数组中找target
    // 如果找到，输出 "找到"
    // 如果没找到，输出 "没找到"

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {3, 7, 1, 9, 5, 7};
    int target = 7;
    bool found = false;

    for (int i = 0; i < 6; i++) {
        if (arr[i] == target) {
            found = true;
            break;
        }
    }

    if (found) {
        cout << "找到" << endl;
    } else {
        cout << "没找到" << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '找到', description: '找到7' }
        ],
        hints: [
          '用for循环遍历数组',
          '用if判断每个元素是否等于目标',
          '找到后用break提前结束循环'
        ],
        rewards: { experience: 180, magicStones: 70 }
      },
      {
        id: '6-4',
        chapterId: 6,
        chapterName: '排序秘籍',
        name: '插入排序',
        description: '学习插入排序算法',
        story: '奥兰多教你另一种排序方法——插入排序！它就像整理扑克牌一样，把每张牌插入到正确的位置。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '用插入排序对数组进行排序！'
        },
        difficulty: 'hard',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 4, 6, 1};

    // 使用插入排序算法

    // 输出排序后的数组

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 4, 6, 1};

    for (int i = 1; i < 5; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }

    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1 2 4 5 6 ', description: '排序结果' }
        ],
        hints: [
          '从第二个元素开始',
          '把当前元素与前面的元素比较',
          '找到正确位置后插入'
        ],
        rewards: { experience: 200, magicStones: 80 }
      }
    ]
  },
  {
    id: 7,
    name: '函数魔法',
    description: '学习自定义函数',
    icon: '🪄',
    color: 'from-rose-500 to-pink-500',
    levels: [
      {
        id: '7-1',
        chapterId: 7,
        chapterName: '函数魔法',
        name: 'Hello函数',
        description: '创建第一个函数',
        story: '奥兰多告诉你，函数就像魔法卷轴！我们可以把一段常用的魔法写进卷轴，需要时念出咒语（调用函数）就能使用。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个sayHello函数，输出"你好"！'
        },
        difficulty: 'medium',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

// 在这里创建 sayHello 函数

int main() {
    // 调用 sayHello 函数

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

void sayHello() {
    cout << "你好" << endl;
}

int main() {
    sayHello();
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '你好', description: '输出你好' }
        ],
        hints: [
          '用void表示函数不返回值',
          '函数定义在main之前',
          '调用时直接写函数名()'
        ],
        rewards: { experience: 150, magicStones: 60 }
      },
      {
        id: '7-2',
        chapterId: 7,
        chapterName: '函数魔法',
        name: '加法函数',
        description: '学习带参数的函数',
        story: '现在奥兰多教你更强大的函数——可以接收参数的函数！就像传送门一样，输入坐标，就能到达指定位置。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个add函数，接收两个参数并输出它们的和！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

// 创建 add 函数，接收两个整数参数

int main() {
    add(5, 3);
    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

void add(int a, int b) {
    cout << a + b << endl;
}

int main() {
    add(5, 3);
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '8', description: '输出8' }
        ],
        hints: [
          '函数参数写在函数名后面的小括号里',
          '参数要有类型：int a, int b',
          '调用时传入具体的值'
        ],
        rewards: { experience: 160, magicStones: 65 }
      },
      {
        id: '7-3',
        chapterId: 7,
        chapterName: '函数魔法',
        name: '返回值',
        description: '学习有返回值的函数',
        story: '有些函数不只是执行操作，还要返回结果。奥兰多教你创建有返回值的函数！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个multiply函数，返回两个数的乘积！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

// 创建 multiply 函数，返回两个数的乘积

int main() {
    int result = multiply(4, 5);
    cout << result << endl;
    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int result = multiply(4, 5);
    cout << result << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '20', description: '输出20' }
        ],
        hints: [
          '返回值类型写在前面的int',
          '用return返回结果',
          '返回后函数结束'
        ],
        rewards: { experience: 170, magicStones: 70 }
      },
      {
        id: '7-4',
        chapterId: 7,
        chapterName: '函数魔法',
        name: '判断素数',
        description: '编写判断素数的函数',
        story: '奥兰多教你如何判断一个数是否是素数。素数是只能被1和它本身整除的数，比如2、3、5、7等。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '编写一个函数，判断一个数是否是素数！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

// 编写一个判断素数的函数
bool isPrime(int n) {
    // 在这里实现

}

int main() {
    int n;
    cin >> n;

    if (isPrime(n)) {
        cout << "是素数" << endl;
    } else {
        cout << "不是素数" << endl;
    }

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;

    if (isPrime(n)) {
        cout << "是素数" << endl;
    } else {
        cout << "不是素数" << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '7', expectedOutput: '是素数', description: '7是素数' },
          { input: '8', expectedOutput: '不是素数', description: '8不是素数' }
        ],
        hints: [
          '素数是只能被1和本身整除的数',
          '只需要检查到sqrt(n)',
          '如果发现任何因子就不是素数'
        ],
        rewards: { experience: 180, magicStones: 75 }
      }
    ]
  },
  {
    id: 8,
    name: '查找秘籍',
    description: '学习高级查找算法',
    icon: '🔍',
    color: 'from-teal-500 to-cyan-500',
    levels: [
      {
        id: '8-1',
        chapterId: 8,
        chapterName: '查找秘籍',
        name: '二分查找',
        description: '学习二分查找算法',
        story: '奥兰多展示了一个神奇的查找魔法——二分查找！它只适用于已排序的数组，但速度极快！就像在字典里找单词，每次排除一半。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '在已排序的数组中使用二分查找找到7！'
        },
        difficulty: 'hard',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[7] = {1, 3, 5, 7, 9, 11, 13};
    int target = 7;

    // 使用二分查找
    // 如果找到输出 "找到"
    // 没找到输出 "没找到"

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[7] = {1, 3, 5, 7, 9, 11, 13};
    int target = 7;
    int left = 0, right = 6;
    bool found = false;

    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) {
            found = true;
            break;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (found) cout << "找到" << endl;
    else cout << "没找到" << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '找到', description: '找到7' }
        ],
        hints: [
          '二分查找需要已排序的数组',
          '每次取中间位置mid',
          '根据大小关系排除一半'
        ],
        rewards: { experience: 250, magicStones: 100 }
      },
      {
        id: '8-2',
        chapterId: 8,
        chapterName: '查找秘籍',
        name: '顺序查找',
        description: '学习基本的顺序查找',
        story: '奥兰多教你最简单的查找方法——顺序查找！就像在一排书中一本本找自己想要的那本。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '用顺序查找找出数组中的目标数！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 2, 9, 1};
    int target = 9;

    // 使用顺序查找

    // 输出找到或没找到

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 2, 9, 1};
    int target = 9;
    bool found = false;

    for (int i = 0; i < 5; i++) {
        if (arr[i] == target) {
            found = true;
            break;
        }
    }

    if (found) cout << "找到" << endl;
    else cout << "没找到" << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '找到', description: '找到9' }
        ],
        hints: [
          '从第一个元素开始依次检查',
          '用for循环遍历',
          '找到后用break结束'
        ],
        rewards: { experience: 120, magicStones: 40 }
      },
      {
        id: '8-3',
        chapterId: 8,
        chapterName: '查找秘籍',
        name: '统计次数',
        description: '统计某个元素出现的次数',
        story: '奥兰多教你一个新技能——统计元素出现次数！这在数据分析中非常有用。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '统计数字5在数组中出现了多少次！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {5, 2, 5, 7, 5, 3, 5, 1};
    int target = 5;

    // 统计target出现的次数

    // 输出次数

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {5, 2, 5, 7, 5, 3, 5, 1};
    int target = 5;
    int count = 0;

    for (int i = 0; i < 8; i++) {
        if (arr[i] == target) {
            count++;
        }
    }

    cout << count << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '4', description: '5出现了4次' }
        ],
        hints: [
          '用一个计数器记录次数',
          '遍历数组',
          '每次相等时count++'
        ],
        rewards: { experience: 140, magicStones: 50 }
      }
    ]
  },
  {
    id: 9,
    name: '字符串魔法',
    description: '学习字符串处理',
    icon: '📝',
    color: 'from-violet-500 to-purple-500',
    levels: [
      {
        id: '9-1',
        chapterId: 9,
        chapterName: '字符串魔法',
        name: '字符串基础',
        description: '学习C++字符串',
        story: '奥兰多教你一种新的数据类型——字符串！字符串可以存储一串字符，就像一句话或者一个单词。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '创建一个字符串并输出它！'
        },
        difficulty: 'easy',
        type: 'tutorial',
        codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 创建一个字符串变量

    // 输出这个字符串

    return 0;
}`,
        solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "小法师";
    cout << name << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '小法师', description: '输出字符串' }
        ],
        hints: [
          '需要包含头文件 #include <string>',
          '用string类型定义字符串',
          '字符串需要用双引号包围'
        ],
        rewards: { experience: 100, magicStones: 30 }
      },
      {
        id: '9-2',
        chapterId: 9,
        chapterName: '字符串连接',
        name: '字符串拼接',
        description: '学习连接字符串',
        story: '字符串就像积木，可以拼接在一起！奥兰多教你如何把多个字符串合成一个。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '把"Hello"和"World"连接起来输出！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1 = "Hello";
    string s2 = "World";

    // 用 + 号连接字符串并输出

    return 0;
}`,
        solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1 = "Hello";
    string s2 = "World";
    cout << s1 + s2 << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: 'HelloWorld', description: '连接字符串' }
        ],
        hints: [
          '用 + 号可以连接字符串',
          '结果是一个新的字符串'
        ],
        rewards: { experience: 110, magicStones: 35 }
      },
      {
        id: '9-3',
        chapterId: 9,
        chapterName: '字符串魔法',
        name: '字符串长度',
        description: '学习获取字符串长度',
        story: '想知道一个字符串有多少个字符吗？可以用length()函数来获取！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输出字符串"Programming"的长度！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Programming";

    // 输出字符串的长度

    return 0;
}`,
        solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Programming";
    cout << s.length() << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '11', description: '输出长度11' }
        ],
        hints: [
          '用 .length() 获取字符串长度',
          '结果是字符的个数'
        ],
        rewards: { experience: 120, magicStones: 40 }
      },
      {
        id: '9-4',
        chapterId: 9,
        chapterName: '字符串魔法',
        name: '字符访问',
        description: '访问字符串中的字符',
        story: '字符串中的每个字符都有一个位置（索引），我们可以直接访问它们！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输出字符串"Apple"的第一个字符！'
        },
        difficulty: 'easy',
        type: 'practice',
        codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Apple";

    // 输出第一个字符 s[0]

    return 0;
}`,
        solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Apple";
    cout << s[0] << endl;
    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: 'A', description: '输出A' }
        ],
        hints: [
          '用 s[0] 访问第一个字符',
          '索引从0开始！'
        ],
        rewards: { experience: 130, magicStones: 45 }
      },
      {
        id: '9-5',
        chapterId: 9,
        chapterName: '字符串魔法',
        name: '字符串反转',
        description: '反转字符串的字符顺序',
        story: '奥兰多教你一个有趣的字符串操作——反转字符串！就像把镜子里的字反过来一样。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '把输入的字符串反转后输出！'
        },
        difficulty: 'medium',
        type: 'practice',
        codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    // 反转字符串

    // 输出反转后的字符串

    return 0;
}`,
        solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int n = s.length();
    for (int i = 0; i < n / 2; i++) {
        swap(s[i], s[n - 1 - i]);
    }

    cout << s << endl;

    return 0;
}`,
        testCases: [
          { input: 'hello', expectedOutput: 'olleh', description: '反转hello' }
        ],
        hints: [
          '用两个指针从两端向中间',
          '用swap交换字符',
          '只需遍历一半'
        ],
        rewards: { experience: 150, magicStones: 55 }
      }
    ]
  },
  {
    id: 10,
    name: '综合练习',
    description: '综合运用所学知识',
    icon: '🎯',
    color: 'from-rose-500 to-red-500',
    levels: [
      {
        id: '10-1',
        chapterId: 10,
        chapterName: '综合练习',
        name: '计算器',
        description: '综合练习：实现简单计算器',
        story: '现在你已经学会了基础，让我们做一个综合练习——实现一个简单的计算器！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '实现一个计算器，可以做加减乘除！'
        },
        difficulty: 'medium',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;
    cin >> a >> op >> b;

    // 根据 op 进行运算
    // op 可以是 +, -, *, /

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;
    cin >> a >> op >> b;

    if (op == '+') cout << a + b << endl;
    else if (op == '-') cout << a - b << endl;
    else if (op == '*') cout << a * b << endl;
    else if (op == '/' && b != 0) cout << a / b << endl;

    return 0;
}`,
        testCases: [
          { input: '5 + 3', expectedOutput: '8', description: '加法' },
          { input: '10 - 4', expectedOutput: '6', description: '减法' },
          { input: '6 * 7', expectedOutput: '42', description: '乘法' }
        ],
        hints: [
          '用if判断运算符',
          '注意除法要检查除数不为0'
        ],
        rewards: { experience: 200, magicStones: 80 }
      },
      {
        id: '10-2',
        chapterId: 10,
        chapterName: '综合练习',
        name: '猜数字',
        description: '综合练习：猜数字游戏',
        story: '让我们做一个有趣的游戏——猜数字！计算机会想一个1-100的数字，你要猜中它！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '实现猜数字游戏，判断猜测是大还是小！'
        },
        difficulty: 'medium',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int target = 50; // 目标数字
    int guess;
    cin >> guess;

    // 如果 guess > target，输出 "大了"
    // 如果 guess < target，输出 "小了"
    // 如果 guess == target，输出 "正确"

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int target = 50;
    int guess;
    cin >> guess;

    if (guess > target) {
        cout << "大了" << endl;
    } else if (guess < target) {
        cout << "小了" << endl;
    } else {
        cout << "正确" << endl;
    }

    return 0;
}`,
        testCases: [
          { input: '60', expectedOutput: '大了', description: '大了' },
          { input: '30', expectedOutput: '小了', description: '小了' },
          { input: '50', expectedOutput: '正确', description: '正确' }
        ],
        hints: [
          '用if-else判断大小关系',
          '注意相等用 == '
        ],
        rewards: { experience: 220, magicStones: 90 }
      },
      {
        id: '10-3',
        chapterId: 10,
        chapterName: '综合练习',
        name: '求平均数',
        description: '综合练习：求平均数',
        story: '现在你需要帮助奥兰多计算班级同学的平均成绩！',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '计算5个同学的平均成绩！'
        },
        difficulty: 'medium',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int scores[5] = {85, 92, 78, 95, 88};

    // 计算平均分并输出

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int scores[5] = {85, 92, 78, 95, 88};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }

    cout << sum / 5.0 << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '87.6', description: '平均分87.6' }
        ],
        hints: [
          '先求和，再除以数量',
          '用5.0可以得到小数'
        ],
        rewards: { experience: 240, magicStones: 100 }
      },
      {
        id: '10-4',
        chapterId: 10,
        chapterName: '综合练习',
        name: '数字排序',
        description: '对数字进行排序',
        story: '奥兰多给你一个挑战——对一组数字进行排序！这需要用到我们之前学的排序算法。',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '对数组 {5, 2, 8, 1, 9} 进行升序排序并输出！'
        },
        difficulty: 'medium',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 8, 1, 9};

    // 对数组进行升序排序

    // 输出排序后的数组

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 2, 8, 1, 9};

    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5 - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
        testCases: [
          { input: '', expectedOutput: '1 2 5 8 9 ', description: '排序结果' }
        ],
        hints: [
          '可以用冒泡排序',
          '相邻元素比较大小后交换',
          '每轮把最大的放到最后'
        ],
        rewards: { experience: 260, magicStones: 110 }
      },
      {
        id: '10-5',
        chapterId: 10,
        chapterName: '综合练习',
        name: '斐波那契数列',
        description: '输出斐波那契数列',
        story: '奥兰多教你一个著名的数列——斐波那契数列！每个数都是前两个数的和：1, 1, 2, 3, 5, 8, 13...',
        npc: {
          name: '奥兰多',
          avatar: '🧙',
          dialogue: '输入n，输出斐波那契数列的前n项！'
        },
        difficulty: 'medium',
        type: 'challenge',
        codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 输出斐波那契数列的前n项

    return 0;
}`,
        solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int a = 1, b = 1;
    if (n >= 1) cout << a << " ";
    if (n >= 2) cout << b << " ";

    for (int i = 3; i <= n; i++) {
        int c = a + b;
        cout << c << " ";
        a = b;
        b = c;
    }
    cout << endl;

    return 0;
}`,
        testCases: [
          { input: '10', expectedOutput: '1 1 2 3 5 8 13 21 34 55 ', description: '前10项' }
        ],
        hints: [
          '前两项是1, 1',
          '每项等于前两项之和',
          '用两个变量保存前两项'
        ],
        rewards: { experience: 280, magicStones: 120 }
      }
    ]
  }
];

export const defaultUser = {
  id: 'user-1',
  username: '小法师',
  avatar: '🧙‍♂️',
  level: 1,
  experience: 0,
  magicStones: 0,
  createdAt: new Date(),
  streak: 0,
  lastLoginDate: new Date().toISOString().split('T')[0]
};

export const achievements = [
  { id: 'first-code', name: '初学乍练', description: '完成你的第一个关卡', icon: '🌟', unlockedAt: undefined },
  { id: 'loop-master', name: '循环大师', description: '完成所有循环关卡', icon: '🔄', unlockedAt: undefined },
  { id: 'array-hero', name: '数组英雄', description: '完成所有数组关卡', icon: '📊', unlockedAt: undefined },
  { id: 'sort-wizard', name: '排序巫师', description: '掌握排序算法', icon: '🧹', unlockedAt: undefined },
  { id: 'ten-levels', name: '小试牛刀', description: '完成10个关卡', icon: '🏆', unlockedAt: undefined },
  { id: 'daily-champion', name: '每日王者', description: '连续完成7天每日挑战', icon: '👑', unlockedAt: undefined },
  { id: 'function-wizard', name: '函数法师', description: '掌握函数魔法', icon: '🪄', unlockedAt: undefined },
  { id: 'search-master', name: '查找大师', description: '掌握二分查找', icon: '🔍', unlockedAt: undefined },
  { id: 'week-streak', name: '坚持不懈', description: '连续学习7天', icon: '🔥', unlockedAt: undefined },
  { id: 'pet-trainer', name: '宠物大师', description: '培养所有宠物到满级', icon: '🎓', unlockedAt: undefined },
];

export const pets = [
  { id: 'pet-1', name: '变量兔', type: 'rabbit', level: 1, exp: 0, image: '🐰', skills: ['变量理解', '数据类型'] },
  { id: 'pet-2', name: '循环鹰', type: 'eagle', level: 1, exp: 0, image: '🦅', skills: ['循环理解', '迭代思维'] },
  { id: 'pet-3', name: '指针猫', type: 'cat', level: 1, exp: 0, image: '🐱', skills: ['数组理解', '内存概念'] },
  { id: 'pet-4', name: '排序龙', type: 'dragon', level: 1, exp: 0, image: '🐉', skills: ['排序算法', '比较思维'] },
  { id: 'pet-5', name: '函数狐', type: 'fox', level: 1, exp: 0, image: '🦊', skills: ['函数封装', '代码复用'] },
  { id: 'pet-6', name: '查找狼', type: 'wolf', level: 1, exp: 0, image: '🐺', skills: ['查找算法', '二分思维'] },
];
