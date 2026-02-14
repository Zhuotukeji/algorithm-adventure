// Daily Challenge Service
import { supabase } from './supabase';

// Types
export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  chapterId: number;
  levelId: string;
  codeTemplate: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  rewards: { experience: number; magicStones: number };
}

// Get date string in YYYY-MM-DD format
export const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

// Generate a deterministic seed from date and user level
const getSeed = (date: string, userLevel: number): number => {
  let hash = 0;
  const str = `${date}-${userLevel}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Get difficulty based on user level
export const getDifficultyByLevel = (userLevel: number): 'easy' | 'medium' | 'hard' => {
  if (userLevel <= 5) return 'easy';
  if (userLevel <= 10) return 'medium';
  return 'hard';
};

// Get chapter IDs based on difficulty
const getChapterIdsByDifficulty = (difficulty: string): number[] => {
  switch (difficulty) {
    case 'easy':
      return [1, 2, 3, 4]; // Basics
    case 'medium':
      return [5, 6, 7, 8, 9, 10]; // Intermediate
    case 'hard':
      return [11, 12, 13, 14, 15, 16, 17, 18]; // Advanced
    default:
      return [1, 2, 3];
  }
};

// Easy level challenges (20+ questions)
const easyChallenges = [
  // Chapter 1: Hello World variations
  {
    title: '输出问候语',
    description: '使用cout输出 "Hello, World!"',
    chapterId: 1,
    levelId: 'daily-easy-1',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 输出 "Hello, World!"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'Hello, World!', description: '输出Hello World' }],
    hints: ['使用 cout << "内容" 输出', 'endl 表示换行'],
    rewards: { experience: 50, magicStones: 15 }
  },
  {
    title: '输出魔法咒语',
    description: '使用cout输出 "Hello, Magic!"',
    chapterId: 1,
    levelId: 'daily-easy-2',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 输出 "Hello, Magic!"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Magic!" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'Hello, Magic!', description: '输出Hello Magic' }],
    hints: ['使用 cout << 输出文字', '记得加 endl 换行'],
    rewards: { experience: 50, magicStones: 15 }
  },
  {
    title: '输出数字',
    description: '直接输出数字 42',
    chapterId: 1,
    levelId: 'daily-easy-3',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 输出数字 42

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    cout << 42 << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '42', description: '输出42' }],
    hints: ['直接输出数字不需要引号', '用 cout << 数字'],
    rewards: { experience: 50, magicStones: 15 }
  },
  // Chapter 2: Variables
  {
    title: '变量加法',
    description: '创建两个变量并相加输出',
    chapterId: 2,
    levelId: 'daily-easy-4',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    // 计算 a + b 并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    cout << a + b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '8', description: '5+3=8' }],
    hints: ['使用 + 号进行加法', '用 cout 输出结果'],
    rewards: { experience: 60, magicStones: 20 }
  },
  {
    title: '变量减法',
    description: '计算 10 减 3 的结果',
    chapterId: 2,
    levelId: 'daily-easy-5',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    // 计算 a - b 并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    cout << a - b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '7', description: '10-3=7' }],
    hints: ['使用 - 号进行减法'],
    rewards: { experience: 60, magicStones: 20 }
  },
  {
    title: '变量乘法',
    description: '计算 6 乘 7 的结果',
    chapterId: 2,
    levelId: 'daily-easy-6',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 6, b = 7;
    // 计算 a * b 并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 6, b = 7;
    cout << a * b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '42', description: '6*7=42' }],
    hints: ['使用 * 号进行乘法'],
    rewards: { experience: 60, magicStones: 20 }
  },
  {
    title: '变量除法',
    description: '计算 20 除以 4 的结果',
    chapterId: 2,
    levelId: 'daily-easy-7',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 20, b = 4;
    // 计算 a / b 并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 20, b = 4;
    cout << a / b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '5', description: '20/4=5' }],
    hints: ['使用 / 号进行除法'],
    rewards: { experience: 60, magicStones: 20 }
  },
  {
    title: '求余数',
    description: '计算 17 除以 5 的余数',
    chapterId: 2,
    levelId: 'daily-easy-8',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    // 计算 a % b 并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    cout << a % b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '2', description: '17%5=2' }],
    hints: ['使用 % 号求余数'],
    rewards: { experience: 70, magicStones: 22 }
  },
  // Chapter 3: Conditionals
  {
    title: '判断大小',
    description: '判断10和20哪个更大',
    chapterId: 3,
    levelId: 'daily-easy-9',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int x = 10, y = 20;
    // 如果 x > y 输出 "x更大"
    // 否则输出 "y更大"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int x = 10, y = 20;
    if (x > y) cout << "x更大" << endl;
    else cout << "y更大" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'y更大', description: '10 < 20' }],
    hints: ['使用 if-else 判断', '比较运算符 >'],
    rewards: { experience: 80, magicStones: 25 }
  },
  {
    title: '判断奇偶',
    description: '判断一个数是奇数还是偶数',
    chapterId: 3,
    levelId: 'daily-easy-10',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n = 7;
    // 如果 n 是偶数输出 "偶数"
    // 否则输出 "奇数"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n = 7;
    if (n % 2 == 0) cout << "偶数" << endl;
    else cout << "奇数" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '奇数', description: '7是奇数' }],
    hints: ['用 %2 判断', '等于0是偶数'],
    rewards: { experience: 80, magicStones: 25 }
  },
  {
    title: '判断正负',
    description: '判断一个数是正数、负数还是零',
    chapterId: 3,
    levelId: 'daily-easy-11',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n = -5;
    // 如果 n > 0 输出 "正数"
    // 如果 n < 0 输出 "负数"
    // 否则输出 "零"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n = -5;
    if (n > 0) cout << "正数" << endl;
    else if (n < 0) cout << "负数" << endl;
    else cout << "零" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '负数', description: '-5是负数' }],
    hints: ['用 if-else if-else', '先判断大于0'],
    rewards: { experience: 90, magicStones: 28 }
  },
  {
    title: '判断是否能被3整除',
    description: '判断一个数是否能被3整除',
    chapterId: 3,
    levelId: 'daily-easy-12',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n = 9;
    // 如果 n % 3 == 0 输出 "能整除"
    // 否则输出 "不能整除"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n = 9;
    if (n % 3 == 0) cout << "能整除" << endl;
    else cout << "不能整除" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '能整除', description: '9%3=0' }],
    hints: ['用 % 判断余数', '等于0表示能整除'],
    rewards: { experience: 80, magicStones: 25 }
  },
  {
    title: '找出最大值',
    description: '找出两个数中的最大值',
    chapterId: 3,
    levelId: 'daily-easy-13',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 8;
    // 输出较大的那个数

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 8;
    if (a > b) cout << a << endl;
    else cout << b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '15', description: '15>8' }],
    hints: ['用 if 比较大小', '输出较大的'],
    rewards: { experience: 80, magicStones: 25 }
  },
  {
    title: '判断是否及格',
    description: '判断分数是否及格(60分及格)',
    chapterId: 3,
    levelId: 'daily-easy-14',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int score = 75;
    // 如果 score >= 60 输出 "及格"
    // 否则输出 "不及格"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int score = 75;
    if (score >= 60) cout << "及格" << endl;
    else cout << "不及格" << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '及格', description: '75>=60' }],
    hints: ['用 >= 判断是否及格'],
    rewards: { experience: 80, magicStones: 25 }
  },
  // Chapter 4: Simple Loops
  {
    title: '循环输出',
    description: '用for循环输出1到5',
    chapterId: 4,
    levelId: 'daily-easy-15',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 用for循环输出 1 2 3 4 5 (每个数字后有空格)

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1 2 3 4 5 ', description: '输出1到5' }],
    hints: ['用 for 循环', '从1到5'],
    rewards: { experience: 90, magicStones: 28 }
  },
  {
    title: '循环求和',
    description: '用for循环计算1到5的和',
    chapterId: 4,
    levelId: 'daily-easy-16',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    // 用for循环计算1+2+3+4+5

    cout << sum << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '15', description: '1+2+3+4+5=15' }],
    hints: ['用循环累加', 'sum += i'],
    rewards: { experience: 100, magicStones: 30 }
  },
  {
    title: '输出偶数',
    description: '用for循环输出2到10的偶数',
    chapterId: 4,
    levelId: 'daily-easy-17',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // 输出 2 4 6 8 10

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 2; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '2 4 6 8 10 ', description: '偶数2到10' }],
    hints: ['每次加2', '从2开始'],
    rewards: { experience: 90, magicStones: 28 }
  },
  {
    title: 'while循环',
    description: '用while循环输出1到3',
    chapterId: 4,
    levelId: 'daily-easy-18',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    // 用while循环输出1到3

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i <= 3) {
        cout << i << " ";
        i++;
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1 2 3 ', description: 'while输出1到3' }],
    hints: ['while循环条件', '记得i++'],
    rewards: { experience: 90, magicStones: 28 }
  },
  {
    title: '阶乘计算',
    description: '计算5的阶乘',
    chapterId: 4,
    levelId: 'daily-easy-19',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int result = 1;
    // 用循环计算 n!

    cout << result << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    cout << result << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '120', description: '5!=120' }],
    hints: ['阶乘是连乘', 'result *= i'],
    rewards: { experience: 110, magicStones: 35 }
  },
  {
    title: '计算平均值',
    description: '计算3个数的平均值',
    chapterId: 4,
    levelId: 'daily-easy-20',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20, c = 30;
    // 计算平均值并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20, c = 30;
    cout << (a + b + c) / 3 << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '20', description: '(10+20+30)/3=20' }],
    hints: ['先求和再除以3', '注意整数除法'],
    rewards: { experience: 70, magicStones: 22 }
  }
];

// Medium level challenges (20+ questions)
const mediumChallenges = [
  // Chapter 5: Arrays
  {
    title: '数组求最大值',
    description: '在数组中找出最大的数',
    chapterId: 5,
    levelId: 'daily-medium-1',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {3, 7, 2, 9, 1};
    // 找出数组中的最大值并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {3, 7, 2, 9, 1};
    int max = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > max) max = arr[i];
    }
    cout << max << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '9', description: '最大值是9' }],
    hints: ['假设第一个是最大值', '遍历比较每个元素'],
    rewards: { experience: 120, magicStones: 40 }
  },
  {
    title: '数组求最小值',
    description: '在数组中找出最小的数',
    chapterId: 5,
    levelId: 'daily-medium-2',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    // 找出数组中的最小值并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int min = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] < min) min = arr[i];
    }
    cout << min << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1', description: '最小值是1' }],
    hints: ['假设第一个是最小值', '遍历比较'],
    rewards: { experience: 120, magicStones: 40 }
  },
  {
    title: '数组求和',
    description: '计算数组所有元素的和',
    chapterId: 5,
    levelId: 'daily-medium-3',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    // 计算数组所有元素的和并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    cout << sum << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '15', description: '1+2+3+4+5=15' }],
    hints: ['用循环累加', '遍历每个元素'],
    rewards: { experience: 110, magicStones: 35 }
  },
  {
    title: '数组逆序',
    description: '将数组逆序输出',
    chapterId: 5,
    levelId: 'daily-medium-4',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    // 逆序输出数组

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 4; i >= 0; i--) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '5 4 3 2 1 ', description: '逆序输出' }],
    hints: ['从最后一个开始', '递减到0'],
    rewards: { experience: 120, magicStones: 40 }
  },
  {
    title: '统计正数个数',
    description: '统计数组中正数的个数',
    chapterId: 5,
    levelId: 'daily-medium-5',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-1, 2, -3, 4, 5};
    // 统计正数个数并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-1, 2, -3, 4, 5};
    int count = 0;
    for (int i = 0; i < 5; i++) {
        if (arr[i] > 0) count++;
    }
    cout << count << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '3', description: '3个正数' }],
    hints: ['遍历数组', '大于0则count++'],
    rewards: { experience: 120, magicStones: 40 }
  },
  // Chapter 6: Sorting
  {
    title: '冒泡排序',
    description: '对数组进行冒泡排序',
    chapterId: 6,
    levelId: 'daily-medium-6',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    // 使用冒泡排序对数组升序排列
    // 然后输出排序后的数组

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1 2 3 5 8 ', description: '排序结果' }],
    hints: ['相邻两个比较大小', '大的往后挪'],
    rewards: { experience: 150, magicStones: 50 }
  },
  {
    title: '选择排序',
    description: '对数组进行选择排序',
    chapterId: 6,
    levelId: 'daily-medium-7',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    // 使用选择排序对数组升序排列
    // 然后输出排序后的数组

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    for (int i = 0; i < 4; i++) {
        int minIdx = i;
        for (int j = i + 1; j < 5; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '11 12 22 25 64 ', description: '选择排序结果' }],
    hints: ['找最小元素', '与当前位置交换'],
    rewards: { experience: 160, magicStones: 55 }
  },
  {
    title: '插入排序',
    description: '对数组进行插入排序',
    chapterId: 6,
    levelId: 'daily-medium-8',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    // 使用插入排序对数组升序排列
    // 然后输出排序后的数组

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {12, 11, 13, 5, 6};
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
    testCases: [{ input: '', expectedOutput: '5 6 11 12 13 ', description: '插入排序结果' }],
    hints: ['插入已排序部分', '从后向前比较'],
    rewards: { experience: 160, magicStones: 55 }
  },
  {
    title: '查找第二大数',
    description: '找出数组中第二大的数',
    chapterId: 6,
    levelId: 'daily-medium-9',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 8, 3, 9, 2};
    // 找出第二大的数并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 8, 3, 9, 2};
    int max1 = arr[0], max2 = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i];
        } else if (arr[i] > max2) {
            max2 = arr[i];
        }
    }
    cout << max2 << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '8', description: '第二大是8' }],
    hints: ['同时记录最大和第二大', '分情况更新'],
    rewards: { experience: 140, magicStones: 45 }
  },
  // Chapter 7: Functions
  {
    title: '编写阶乘函数',
    description: '编写一个计算阶乘的函数',
    chapterId: 7,
    levelId: 'daily-medium-10',
    codeTemplate: `#include <iostream>
using namespace std;

// 编写factorial函数计算n的阶乘
int factorial(int n) {
    // 在这里填写代码
}

int main() {
    cout << factorial(5) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    cout << factorial(5) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '120', description: '5的阶乘' }],
    hints: ['阶乘是1*2*3*...*n', '用循环累乘'],
    rewards: { experience: 150, magicStones: 50 }
  },
  {
    title: '编写求绝对值函数',
    description: '编写一个求绝对值的函数',
    chapterId: 7,
    levelId: 'daily-medium-11',
    codeTemplate: `#include <iostream>
using namespace std;

// 编写abs函数计算绝对值
int abs(int n) {
    // 在这里填写代码
}

int main() {
    cout << abs(-5) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int abs(int n) {
    if (n < 0) return -n;
    return n;
}

int main() {
    cout << abs(-5) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '5', description: '-5的绝对值' }],
    hints: ['负数取反', '正数直接返回'],
    rewards: { experience: 130, magicStones: 42 }
  },
  {
    title: '编写最大值函数',
    description: '编写一个返回较大值的函数',
    chapterId: 7,
    levelId: 'daily-medium-12',
    codeTemplate: `#include <iostream>
using namespace std;

// 编写max函数返回较大值
int max(int a, int b) {
    // 在这里填写代码
}

int main() {
    cout << max(10, 7) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int max(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    cout << max(10, 7) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '10', description: '较大值是10' }],
    hints: ['用if判断', '返回较大的'],
    rewards: { experience: 130, magicStones: 42 }
  },
  {
    title: '编写判断闰年函数',
    description: '编写函数判断是否闰年',
    chapterId: 7,
    levelId: 'daily-medium-13',
    codeTemplate: `#include <iostream>
using namespace std;

// 编写isLeapYear函数判断闰年
bool isLeapYear(int year) {
    // 闰年条件：能被4整除且不能被100整除，或者能被400整除
}

int main() {
    cout << isLeapYear(2024) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int main() {
    cout << isLeapYear(2024) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1', description: '2024是闰年' }],
    hints: ['能被4整除且不能被100整除', '或者能被400整除'],
    rewards: { experience: 150, magicStones: 50 }
  },
  // Chapter 8: Searching
  {
    title: '顺序查找',
    description: '在数组中查找指定的数',
    chapterId: 8,
    levelId: 'daily-medium-14',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 7, 9};
    int target = 7;
    // 查找target是否在数组中
    // 找到输出"找到"，没找到输出"没找到"

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 7, 9};
    int target = 7;
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
    testCases: [{ input: '', expectedOutput: '找到', description: '7在数组中' }],
    hints: ['遍历数组每个元素', '找到就break退出'],
    rewards: { experience: 120, magicStones: 40 }
  },
  {
    title: '二分查找',
    description: '在有序数组中使用二分查找',
    chapterId: 8,
    levelId: 'daily-medium-15',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int target = 7;
    // 使用二分查找
    // 找到输出下标，没找到输出-1

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int target = 7;
    int left = 0, right = 6;
    int result = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) {
            result = mid;
            break;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << result << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '3', description: '7在位置3' }],
    hints: ['每次取中间比较', '缩小搜索范围'],
    rewards: { experience: 180, magicStones: 60 }
  },
  // Chapter 9: Strings
  {
    title: '字符串长度',
    description: '计算字符串的长度',
    chapterId: 9,
    levelId: 'daily-medium-16',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello";
    // 计算字符串长度并输出

    return 0;
}`,
    solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello";
    cout << s.length() << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '5', description: 'hello长度是5' }],
    hints: ['使用 s.length() 方法', '或者 s.size()'],
    rewards: { experience: 100, magicStones: 35 }
  },
  {
    title: '字符串逆序',
    description: '将字符串逆序输出',
    chapterId: 9,
    levelId: 'daily-medium-17',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello";
    // 逆序输出字符串

    return 0;
}`,
    solution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello";
    for (int i = s.length() - 1; i >= 0; i--) {
        cout << s[i];
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'olleh', description: 'hello逆序' }],
    hints: ['从后往前遍历', '输出每个字符'],
    rewards: { experience: 110, magicStones: 38 }
  },
  {
    title: '统计字符个数',
    description: '统计字符串中某个字符出现的次数',
    chapterId: 9,
    levelId: 'daily-medium-18',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello world";
    char c = 'l';
    // 统计字符c出现的次数并输出

    return 0;
}`,
    solution: `##include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello world";
    char c = 'l';
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == c) count++;
    }
    cout << count << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '3', description: '3个l' }],
    hints: ['遍历字符串', '相等则count++'],
    rewards: { experience: 120, magicStones: 40 }
  },
  // Chapter 10: Comprehensive
  {
    title: '简单计算器',
    description: '实现一个简单的计算器',
    chapterId: 10,
    levelId: 'daily-medium-19',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 5;
    char op = '+';
    // 根据op进行运算并输出结果
    // op可以是 + - * /

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 5;
    char op = '+';
    if (op == '+') cout << a + b << endl;
    else if (op == '-') cout << a - b << endl;
    else if (op == '*') cout << a * b << endl;
    else if (op == '/' && b != 0) cout << a / b << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '15', description: '10+5=15' }],
    hints: ['用if判断运算符', '注意除数不能为0'],
    rewards: { experience: 140, magicStones: 45 }
  },
  {
    title: '求数组平均值',
    description: '计算数组所有元素的平均值',
    chapterId: 10,
    levelId: 'daily-medium-20',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    // 计算平均值并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    cout << sum / 5.0 << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '30', description: '平均值为30' }],
    hints: ['先求和', '除以元素个数'],
    rewards: { experience: 120, magicStones: 40 }
  }
];

// Hard level challenges (20+ questions)
const hardChallenges = [
  // Chapter 11: Prime numbers
  {
    title: '判断素数',
    description: '编写函数判断素数',
    chapterId: 11,
    levelId: 'daily-hard-1',
    codeTemplate: `#include <iostream>
using namespace std;

// 编写isPrime函数判断n是否为素数
bool isPrime(int n) {
    // 在这里填写代码
}

int main() {
    cout << isPrime(7) << endl;
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
    cout << isPrime(7) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1', description: '7是素数输出1' }],
    hints: ['素数大于1', '检查2到sqrt(n)有没有因数'],
    rewards: { experience: 180, magicStones: 60 }
  },
  {
    title: '找出素数',
    description: '找出1到20之间的所有素数',
    chapterId: 11,
    levelId: 'daily-hard-2',
    codeTemplate: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    // 找出1到20之间的所有素数并输出

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
    for (int i = 2; i <= 20; i++) {
        if (isPrime(i)) cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '2 3 5 7 11 13 17 19 ', description: '1到20的素数' }],
    hints: ['用isPrime函数判断', '遍历每个数'],
    rewards: { experience: 200, magicStones: 70 }
  },
  {
    title: '分解质因数',
    description: '将一个数分解质因数',
    chapterId: 11,
    levelId: 'daily-hard-3',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int n = 12;
    // 将n分解质因数并输出
    // 例如 12 = 2*2*3

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int n = 12;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            cout << i << " ";
            n /= i;
        }
    }
    if (n > 1) cout << n;
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '2 2 3 ', description: '12=2*2*3' }],
    hints: ['从2开始除', '除尽后i不变'],
    rewards: { experience: 220, magicStones: 75 }
  },
  // Chapter 12: Recursion
  {
    title: '递归求和',
    description: '用递归计算1到n的和',
    chapterId: 12,
    levelId: 'daily-hard-4',
    codeTemplate: `#include <iostream>
using namespace std;

// 用递归计算1到n的和
int sumToN(int n) {
    // 在这里填写代码
}

int main() {
    cout << sumToN(10) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int sumToN(int n) {
    if (n == 1) return 1;
    return n + sumToN(n - 1);
}

int main() {
    cout << sumToN(10) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '55', description: '1+2+...+10=55' }],
    hints: ['递归结束条件：n==1', '返回n + sumToN(n-1)'],
    rewards: { experience: 220, magicStones: 80 }
  },
  {
    title: '递归计算阶乘',
    description: '用递归计算阶乘',
    chapterId: 12,
    levelId: 'daily-hard-5',
    codeTemplate: `#include <iostream>
using namespace std;

// 用递归计算n的阶乘
int factorial(int n) {
    // 在这里填写代码
}

int main() {
    cout << factorial(6) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << factorial(6) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '720', description: '6!=720' }],
    hints: ['递归结束条件：n<=1', '返回n * factorial(n-1)'],
    rewards: { experience: 220, magicStones: 80 }
  },
  {
    title: '递归求幂',
    description: '用递归计算a的b次方',
    chapterId: 12,
    levelId: 'daily-hard-6',
    codeTemplate: `#include <iostream>
using namespace std;

// 用递归计算a的b次方
int power(int a, int b) {
    // 在这里填写代码
}

int main() {
    cout << power(2, 10) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int power(int a, int b) {
    if (b == 0) return 1;
    return a * power(a, b - 1);
}

int main() {
    cout << power(2, 10) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1024', description: '2^10=1024' }],
    hints: ['递归结束条件：b==0', '返回a * power(a, b-1)'],
    rewards: { experience: 230, magicStones: 85 }
  },
  {
    title: '递归逆序字符串',
    description: '用递归逆序输出字符串',
    chapterId: 12,
    levelId: 'daily-hard-7',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

// 用递归逆序输出字符串
void reversePrint(string s, int i) {
    // 在这里填写代码
}

int main() {
    reversePrint("hello", 0);
    cout << endl;
    return 0;
}`,
    solution: `#include <iostream>
#include <string>
using namespace std;

void reversePrint(string s, int i) {
    if (i >= s.length()) return;
    reversePrint(s, i + 1);
    cout << s[i];
}

int main() {
    reversePrint("hello", 0);
    cout << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'olleh', description: 'hello逆序' }],
    hints: ['先递归到末尾', '再往回输出'],
    rewards: { experience: 240, magicStones: 90 }
  },
  {
    title: '斐波那契数列',
    description: '用递归实现斐波那契数列',
    chapterId: 12,
    levelId: 'daily-hard-8',
    codeTemplate: `#include <iostream>
using namespace std;

// 用递归实现斐波那契
int fibonacci(int n) {
    // 在这里填写代码
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '55', description: '第10项是55' }],
    hints: ['前两项是1', '每项等于前两项之和'],
    rewards: { experience: 250, magicStones: 90 }
  },
  // Chapter 13: Structs
  {
    title: '结构体应用',
    description: '使用结构体表示学生信息',
    chapterId: 13,
    levelId: 'daily-hard-9',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
};

int main() {
    Student s;
    s.name = "小明";
    s.age = 10;
    // 输出 "小明 10"

    return 0;
}`,
    solution: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
};

int main() {
    Student s;
    s.name = "小明";
    s.age = 10;
    cout << s.name << " " << s.age << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '小明 10', description: '输出学生信息' }],
    hints: ['用.访问成员', '用cout输出'],
    rewards: { experience: 180, magicStones: 60 }
  },
  {
    title: '结构体数组',
    description: '使用结构体数组存储多个学生信息',
    chapterId: 13,
    levelId: 'daily-hard-10',
    codeTemplate: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {{"Tom", 85}, {"Jerry", 90}, {"Bob", 78}};
    // 找出最高分的学生姓名并输出

    return 0;
}`,
    solution: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {{"Tom", 85}, {"Jerry", 90}, {"Bob", 78}};
    int maxIdx = 0;
    for (int i = 1; i < 3; i++) {
        if (students[i].score > students[maxIdx].score) {
            maxIdx = i;
        }
    }
    cout << students[maxIdx].name << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: 'Jerry', description: 'Jerry最高分' }],
    hints: ['遍历比较分数', '记录最高分下标'],
    rewards: { experience: 200, magicStones: 70 }
  },
  // Chapter 14: Pointers
  {
    title: '指针交换',
    description: '用指针交换两个数的值',
    chapterId: 14,
    levelId: 'daily-hard-11',
    codeTemplate: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    // 用指针交换a和b的值
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '10 5', description: '交换后' }],
    hints: ['用临时变量保存', '通过指针交换值'],
    rewards: { experience: 220, magicStones: 80 }
  },
  {
    title: '指针求数组和',
    description: '用指针计算数组所有元素的和',
    chapterId: 14,
    levelId: 'daily-hard-12',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    // 用指针计算数组和并输出

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int* p = arr;
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += *(p + i);
    }
    cout << sum << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '15', description: '1+2+3+4+5=15' }],
    hints: ['用指针遍历数组', '*(p+i)访问元素'],
    rewards: { experience: 200, magicStones: 70 }
  },
  {
    title: '引用参数',
    description: '使用引用作为函数参数',
    chapterId: 14,
    levelId: 'daily-hard-13',
    codeTemplate: `#include <iostream>
using namespace std;

// 使用引用使a和b的值翻倍
void doubleValues(int& a, int& b) {
    // 在这里填写代码
}

int main() {
    int x = 3, y = 4;
    doubleValues(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

void doubleValues(int& a, int& b) {
    a *= 2;
    b *= 2;
}

int main() {
    int x = 3, y = 4;
    doubleValues(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '6 8', description: '翻倍后' }],
    hints: ['用引用直接修改原变量', 'a *= 2'],
    rewards: { experience: 200, magicStones: 70 }
  },
  // Chapter 15: Advanced algorithms
  {
    title: '最大公约数',
    description: '用欧几里得算法求最大公约数',
    chapterId: 15,
    levelId: 'daily-hard-14',
    codeTemplate: `#include <iostream>
using namespace std;

// 用递归实现欧几里得算法
int gcd(int a, int b) {
    // 在这里填写代码
}

int main() {
    cout << gcd(48, 18) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    cout << gcd(48, 18) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '6', description: 'gcd(48,18)=6' }],
    hints: ['递归结束条件：b==0', 'return gcd(b, a%b)'],
    rewards: { experience: 220, magicStones: 80 }
  },
  {
    title: '最小公倍数',
    description: '求两个数的最小公倍数',
    chapterId: 15,
    levelId: 'daily-hard-15',
    codeTemplate: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// 求a和b的最小公倍数
int lcm(int a, int b) {
    // 在这里填写代码
}

int main() {
    cout << lcm(4, 6) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int lcm(int a, int b) {
    return a * b / gcd(a, b);
}

int main() {
    cout << lcm(4, 6) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '12', description: 'lcm(4,6)=12' }],
    hints: ['lcm = a * b / gcd', '先求gcd'],
    rewards: { experience: 220, magicStones: 80 }
  },
  // Chapter 16: Backtracking
  {
    title: '组合枚举',
    description: '枚举所有可能的组合',
    chapterId: 16,
    levelId: 'daily-hard-16',
    codeTemplate: `#include <iostream>
using namespace std;

void printCombinations(int n, int k) {
    // 打印1到n中选k个数的所有组合
}

int main() {
    printCombinations(4, 2);
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

void combine(int arr[], bool used[], int n, int k, int start) {
    if (k == 0) {
        for (int i = 0; i < n; i++) {
            if (used[i]) cout << arr[i] << " ";
        }
        cout << endl;
        return;
    }
    for (int i = start; i < n; i++) {
        used[i] = true;
        combine(arr, used, n, k - 1, i + 1);
        used[i] = false;
    }
}

void printCombinations(int n, int k) {
    int arr[10];
    bool used[10] = {false};
    for (int i = 0; i < n; i++) arr[i] = i + 1;
    combine(arr, used, n, k, 0);
}

int main() {
    printCombinations(4, 2);
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1 2 \n1 3 \n1 4 \n2 3 \n2 4 \n3 4 \n', description: '组合' }],
    hints: ['用递归枚举', '选过的不能再选'],
    rewards: { experience: 280, magicStones: 100 }
  },
  // Chapter 17: Dynamic Programming basics
  {
    title: '爬楼梯',
    description: '用动态规划解决爬楼梯问题',
    chapterId: 17,
    levelId: 'daily-hard-17',
    codeTemplate: `#include <iostream>
using namespace std;

// 假设一次可以爬1或2级台阶，计算爬n级台阶的方法数
int climbStairs(int n) {
    // 在这里填写代码
}

int main() {
    cout << climbStairs(5) << endl;
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int dp[100];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

int main() {
    cout << climbStairs(5) << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '8', description: '爬5级台阶有8种方法' }],
    hints: ['dp[n] = dp[n-1] + dp[n-2]', '斐波那契数列'],
    rewards: { experience: 250, magicStones: 90 }
  },
  {
    title: '最大子段和',
    description: '找出数组中最大连续子段和',
    chapterId: 17,
    levelId: 'daily-hard-18',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    // 找出最大连续子段和

    return 0;
}`,
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int maxSum = arr[0];
    int current = arr[0];
    for (int i = 1; i < 9; i++) {
        current = max(current + arr[i], arr[i]);
        maxSum = max(maxSum, current);
    }
    cout << maxSum << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '6', description: '最大子段和是6' }],
    hints: ['动态规划', 'current = max(current + arr[i], arr[i])'],
    rewards: { experience: 260, magicStones: 95 }
  },
  // Chapter 18: Advanced data structures
  {
    title: '栈的应用',
    description: '使用栈判断括号是否匹配',
    chapterId: 18,
    levelId: 'daily-hard-19',
    codeTemplate: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "({[]})";
    // 判断括号是否匹配
    // 匹配输出1，不匹配输出0

    return 0;
}`,
    solution: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "({[]})";
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) { valid = false; break; }
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                valid = false; break;
            }
        }
    }
    if (!st.empty()) valid = false;
    cout << valid << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '1', description: '匹配' }],
    hints: ['左括号入栈', '右括号匹配出栈'],
    rewards: { experience: 220, magicStones: 80 }
  },
  {
    title: '队列应用',
    description: '使用队列实现约瑟夫问题',
    chapterId: 18,
    levelId: 'daily-hard-20',
    codeTemplate: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    // 5个人围成一圈，从1开始报数，报到3的人出圈
    // 求最后剩下的人的编号

    return 0;
}`,
    solution: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    for (int i = 1; i <= 5; i++) q.push(i);
    int count = 1;
    while (q.size() > 1) {
        int front = q.front(); q.pop();
        if (count % 3 != 0) q.push(front);
        count++;
    }
    cout << q.front() << endl;
    return 0;
}`,
    testCases: [{ input: '', expectedOutput: '4', description: '最后剩4号' }],
    hints: ['队列模拟循环', '报到3的出圈'],
    rewards: { experience: 240, magicStones: 85 }
  }
];

// Generate a daily challenge based on user level
export const generateDailyChallenge = async (
  userId: string,
  userLevel: number
): Promise<DailyChallenge | null> => {
  const today = getDateString();
  const seed = getSeed(today, userLevel);
  const difficulty = getDifficultyByLevel(userLevel);

  // Try to get existing challenge from database
  const { data: existingChallenge } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('date', today)
    .single();

  if (existingChallenge) {
    // Check if user has already completed this challenge
    const { data: progress } = await supabase
      .from('user_daily_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('challenge_date', today)
      .single();

    return {
      id: existingChallenge.id.toString(),
      date: existingChallenge.date,
      title: existingChallenge.title,
      description: existingChallenge.description,
      difficulty: existingChallenge.difficulty,
      chapterId: existingChallenge.chapter_id,
      levelId: existingChallenge.level_id,
      codeTemplate: existingChallenge.code_template,
      solution: existingChallenge.solution,
      testCases: existingChallenge.test_cases,
      hints: existingChallenge.hints,
      rewards: existingChallenge.rewards
    };
  }

  // Select challenge based on difficulty and seed
  let challenge: DailyChallenge | null = null;

  if (difficulty === 'easy') {
    const selected = easyChallenges[seed % easyChallenges.length];
    challenge = {
      ...selected,
      id: `${today}-easy-${seed}`,
      date: today,
      difficulty: 'easy'
    };
  } else if (difficulty === 'medium') {
    const selected = mediumChallenges[seed % mediumChallenges.length];
    challenge = {
      ...selected,
      id: `${today}-medium-${seed}`,
      date: today,
      difficulty: 'medium'
    };
  } else {
    const selected = hardChallenges[seed % hardChallenges.length];
    challenge = {
      ...selected,
      id: `${today}-hard-${seed}`,
      date: today,
      difficulty: 'hard'
    };
  }

  // Save to database
  if (challenge) {
    await supabase.from('daily_challenges').insert({
      date: today,
      title: challenge.title,
      description: challenge.description,
      difficulty: challenge.difficulty,
      chapter_id: challenge.chapterId,
      level_id: challenge.levelId,
      code_template: challenge.codeTemplate,
      solution: challenge.solution,
      test_cases: challenge.testCases,
      hints: challenge.hints,
      rewards: challenge.rewards
    });
  }

  return challenge;
};

// Record daily challenge progress
export const recordDailyChallengeProgress = async (
  userId: string,
  date: string,
  status: 'not_started' | 'in_progress' | 'completed' | 'failed',
  attempts: number = 0
) => {
  const { error } = await supabase
    .from('user_daily_progress')
    .upsert({
      user_id: userId,
      challenge_date: date,
      status,
      attempts,
      completed_at: status === 'completed' ? new Date().toISOString() : null
    }, {
      onConflict: 'user_id,challenge_date'
    });

  if (error) {
    console.error('Error recording daily progress:', error);
  }
};

// Get user's daily challenge history
export const getDailyChallengeHistory = async (userId: string, limit: number = 7) => {
  const { data, error } = await supabase
    .from('user_daily_progress')
    .select('*')
    .eq('user_id', userId)
    .order('challenge_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching daily challenge history:', error);
    return [];
  }

  return data || [];
};

// Check if today's challenge is completed
export const isTodayChallengeCompleted = async (userId: string): Promise<boolean> => {
  const today = getDateString();
  const { data, error } = await supabase
    .from('user_daily_progress')
    .select('status')
    .eq('user_id', userId)
    .eq('challenge_date', today)
    .single();

  if (error || !data) return false;
  return data.status === 'completed';
};
