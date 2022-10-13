---
title: 变量存储区：堆和栈
date: 2019-05-19
order: -1
---

最近在看PHP源码解析，涉及到堆栈存储区的知识，而我对于这个却不太清楚，因此，看了一下相关资料，总结一下。

## 栈

栈，存储函数中的局部变量（临时变量），存储函数地址，栈是后进先出的结构，由CPU管理和优化。

使用栈存储变量的优势在于：你不用再管理内存了，不必手动分配内存或释放它，此外，由于CPU相关的优化，读取写入的效率也很高。

关于栈需要注意的一点是：存储在栈上的变量的大小是有限制的，而堆却不是。



## 堆
堆是计算机内存的一块区域，不会自动为你管理内存，也不是由CPU严格管理的。它是一个更自由的内存区域（并且更大）。要在堆上分配内存，必须使用 `malloc` 或 `calloc`，它们是内置的C函数。一旦在堆上分配了内存，你就负责在不需要它时使用 `free()`释放内存。如果没有做到这一点，程序将会出现所谓的 **内存泄漏**，也就是说，堆上的内存仍被保留，但其他进程无法使用。

## 示例
下面这个例子展示了在栈上创建变量的情况：

``` c
#include <stdio.h>

double multiplyByTwo (double input) {
  double twice = input * 2.0;
  return twice;
}

int main (int argc, char *argv[])
{
  int age = 30;
  double salary = 12345.67;
  double myList[3] = {1.2, 2.3, 3.4};

  printf("double your salary is %.3f\n", multiplyByTwo(salary));

  return 0;
}
```

第10,11,12行创建了变量：int、double和double数组。这些变量被推入栈中，当main退出时，这些变量自动从栈中弹出。类似的，函数`multiplyByTwo()`中的twice变量被推入栈中（当`multiplyByTwo()`被调用时），`当multiplyByTwo()`退出时，twice被弹出并且消失不见。

下面是一个在堆上分配内存的例子：

``` c
#include <stdio.h>
#include <stdlib.h>

double *multiplyByTwo (double *input) {
  double *twice = malloc(sizeof(double));
  *twice = *input * 2.0;
  return twice;
}

int main (int argc, char *argv[])
{
  int *age = malloc(sizeof(int));
  *age = 30;
  double *salary = malloc(sizeof(double));
  *salary = 12345.67;
  double *myList = malloc(3 * sizeof(double));
  myList[0] = 1.2;
  myList[1] = 2.3;
  myList[2] = 3.4;

  double *twiceSalary = multiplyByTwo(salary);

  printf("double your salary is %.3f\n", *twiceSalary);

  free(age);
  free(salary);
  free(myList);
  free(twiceSalary);

  return 0;
}
```

## 何时使用堆？
什么时候应当使用堆，什么时候使用栈？如果你需要分配大块内存（一个大数组，大的结构体），并且你想保持相当长的时间，此时应当使用堆。如果你只处理相对小的变量，只在函数的范围内使用，那么使用栈，它更容易也更快。如果你需要变量类似动态大小的数组或结构体，那么应当使用堆。


## References
* [https://www.gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html](https://www.gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html)

* [https://www.learncpp.com/cpp-tutorial/79-the-stack-and-the-heap](https://www.learncpp.com/cpp-tutorial/79-the-stack-and-the-heap)