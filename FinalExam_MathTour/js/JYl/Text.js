/*
  Module  :储存所有介绍文字
  Description: 
  Build_Date:2023-12-27
  Version   :1.0
*/

//孙子算经Intro
const text_SZSJ_Intro = {
    "text": [
            // "早在1500年前，中国诞生了一本神奇的书",
            //  "里面讲了很多奇异有趣的数学问题",
            "在中国古代数学璀璨的文化星河中,有几本名著占据了主要地位，比如阐述勾股定理的《周髀算经》",
            "其中一本诞生于1500年前,讲了很多奇异有趣的数学问题，那就是《孙子算经》",
            "《孙子算经》不仅在中国数学史上占有重要地位，而且对后世产生了深远影响。它的许多问题和解题技巧被后来的数学家和教育家广泛引用和研究。",
            "《孙子算经》还体现了中国古代数学的实用性和创新性，它将数学知识与实际生活中的问题紧密结合，展示了古人解决实际问题的智慧和才能，并对世界数学史产生了积极的影响。"
  ]
};
  //孙子算经
const textSZSJ={
    "text":["卷上主要介绍了算筹记数的纵横相间制度和筹算乘除法，这些都是中国古代数学的基础计算方法",
            "卷中通过实例说明了筹算分数算法和筹算开平方法，这些内容反映了当时中国数学在代数和几何方面的成就。",
            "卷下则包含了许多经典的数学问题和解题方法,",
            "其中第31题就是著名的“鸡兔同笼”问题的最早记载。",
            //"有若干只鸡和兔子关在一个笼子里，从上面数共有多少个头，从下面数共有多少只脚，要求求出鸡和兔子各自的数量"
    ]
};
  
  //鸡兔同笼原题
const textWYW={
    text:"今有雉兔同笼,上有三十五头,下有九十四足,问雉兔各几何?——《孙子算经》",

};
  //鸡兔同笼翻译
const textfy={
    text:"翻译：有若干只鸡兔同在一个笼子里,从上面数,有35个头,从下面数,有94只脚.问笼中各有多少只鸡和兔?",

  };
const legLift={
  "text":["假设鸡和兔都抬起两只脚，这样剩下的脚都是兔子的脚。",
          "计算剩下的脚的数量，这个数量除以2就是兔子的数量。",
          "用总的头数减去兔子的数量就得到鸡的数量。"
          /**
           * 鸡兔同笼的抬腿法是一种解决古典数学问题“鸡兔同笼”问题的方法。
           * 这个问题是这样的：一个笼子里关着一些鸡和兔子，头共有n个，脚共有m只，问鸡和兔子各有几只。
           * 抬腿法的解题思路是这样的：
           * 假设我们把所有的兔子都抬起两只前腿（兔子共有4条腿，抬起前腿后剩下2条后腿），
           * 那么此时笼子里的所有动物都只剩下两条腿。因此，现在笼子里的总腿数变为原来的一半，即m/2。
           * 由于鸡始终只有两条腿，所以现在笼子里的鸡和“半兔子”（抬起前腿的兔子）的数量就等于总的腿数m/2。
           * 那么原本的兔子数量就是(m/2 - n) / (2 - 1)，鸡的数量就是n - (m/2 - n) / (2 - 1)。'
           */
        ]
}
const BinaryFirstOrderSystem_Introduce={
  "text":["我们将题目简略为：一个笼子里关着一些鸡和兔子，头共有n个，脚共有m只，问鸡和兔子各有几只",
          "现在我们将鸡的数量记为x，兔子的数量记为y",
        ] 
}

const searchLaw={
  "text":["现在我们将随机生成鸡和兔的数量，并计算出头和腿的数量",
          "请仔细观察并思考其中规律哦",
        ] 
}
const law={
  "text":["头的数量为鸡和兔的数量之和",
          "脚的数量为两倍鸡和四倍兔的数量之和",
        ] 
}
