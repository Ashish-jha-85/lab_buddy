export type Language = {
  id: number;
  name: string;
  key: string; // used by backend & run.sh
  file: string;
  monaco: string;
  template: string;
};

export const LANGUAGES: Language[] = [
  {
    id: 5,
    name: "JavaScript",
    key: "js",
    file: "main.js",
    monaco: "javascript",
    template: `console.log("Hello JS");`,
  },
  {
    id: 1,
    name: "C",
    key: "c",
    file: "main.c",
    monaco: "c",
    template: `#include <stdio.h>
int main() {
  printf("Hello C");
  return 0;
}`,
  },
  {
    id: 2,
    name: "C++",
    key: "cpp",
    file: "main.cpp",
    monaco: "cpp",
    template: `#include <iostream>
using namespace std;
int main(){
  cout<<"Hello C++";
}`,
  },
  {
    id: 3,
    name: "Python",
    key: "python",
    file: "main.py",
    monaco: "python",
    template: `print("Hello Python")`,
  },
  {
    id: 4,
    name: "Java",
    key: "java",
    file: "Main.java",
    monaco: "java",
    template: `class Main {
  public static void main(String[] args){
    System.out.println("Hello Java");
  }
}`,
  },
  // {
  //   id: 5,
  //   name: "JavaScript",
  //   key: "js",
  //   file: "main.js",
  //   monaco: "javascript",
  //   template: `console.log("Hello JS");`,
  // },
  // {
  //   id: 6,
  //   name: "PHP",
  //   key: "php",
  //   file: "main.php",
  //   monaco: "php",
  //   template: `<?php echo "Hello PHP"; ?>`,
  // },
];
