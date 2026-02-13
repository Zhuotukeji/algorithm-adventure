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
          { input: '', expectedOutput: 'Hello, Magic World!', description: '输出 Hello, Magic World!' }
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
          { input: '', expectedOutput: '10', description: '输出 age 的值' }
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
          { input: '', expectedOutput: '8', description: '输出 5+3 的结果' }
        ],
        hints: [
          '直接用 + 号进行加法运算',
          '可以用变量保存结果：int result = 5 + 3;'
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
          { input: '', expectedOutput: '1\n2\n3\n4\n5\n', description: '输出1到5' }
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
