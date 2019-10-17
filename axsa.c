#include<stdio.h>
#include<math.h>
#include<string.h>
int main()
{
    int s1=0,s2=0,s,f=0,g=0;double i;
    char op[10000],ch[100],mn[100];
    while(1){
            i=1;
            s=0;
            s1=0;
            s2=0;
            f=0;
        while(1){
            scanf("%s",ch);
            if(f==0){
            if(ch[0]=='o'&&ch[1]=='n'&&ch[2]=='e')s1=s1*i+1;
            else if(ch[0]=='t'&&ch[1]=='w'&&ch[2]=='o')s1=s1*i+2;
            else if(ch[0]=='t'&&ch[1]=='h'&&ch[2]=='r'&&ch[3]=='e'&&ch[4]=='e')s1=s1*i+3;
            else if(ch[0]=='f'&&ch[1]=='o'&&ch[2]=='u'&&ch[3]=='r')s1=s1*i+4;
            else if(ch[0]=='f'&&ch[1]=='i'&&ch[2]=='v'&&ch[3]=='e')s1=s1*i+5;
            else if(ch[0]=='s'&&ch[1]=='i'&&ch[2]=='x')s1=s1*i+6;
            else if(ch[0]=='e'&&ch[1]=='i'&&ch[2]=='g'&&ch[3]=='h'&&ch[4]=='t')s1=s1*i+8;
            else if(ch[0]=='n'&&ch[1]=='i'&&ch[2]=='n'&&ch[3]=='e')s1=s1*i+9;
            else if(ch[0]=='s'&&ch[1]=='e'&&ch[2]=='v'&&ch[3]=='e'&&ch[4]=='n')s1=s1*i+7;
            else if(ch[0]=='z'&&ch[1]=='e'&&ch[2]=='r'&&ch[3]=='o')s1=s1*i;
            i=i*10;}
            if(ch[0]=='+'){i=0.1;f=1;}
            if(f==1){
              if(ch[0]=='o'&&ch[1]=='n'&&ch[2]=='e')s2=s2*i+1;
            else if(ch[0]=='t'&&ch[1]=='w'&&ch[2]=='o')s2=s2*i+2;
            else if(ch[0]=='t'&&ch[1]=='h'&&ch[2]=='r'&&ch[3]=='e'&&ch[4]=='e')s2=s2*i+3;
            else if(ch[0]=='f'&&ch[1]=='o'&&ch[2]=='u'&&ch[3]=='r')s2=s2*i+4;
            else if(ch[0]=='f'&&ch[1]=='i'&&ch[2]=='v'&&ch[3]=='e')s2=s2*i+5;
            else if(ch[0]=='s'&&ch[1]=='i'&&ch[2]=='x')s2=s2*i+6;
            else if(ch[0]=='e'&&ch[1]=='i'&&ch[2]=='g'&&ch[3]=='h'&&ch[4]=='t')s2=s2*i+8;
            else if(ch[0]=='n'&&ch[1]=='i'&&ch[2]=='n'&&ch[3]=='e')s2=s2*i+9;
            else if(ch[0]=='s'&&ch[1]=='e'&&ch[2]=='v'&&ch[3]=='e'&&ch[4]=='n')s2=s2*i+7;
            else if(ch[0]=='z'&&ch[1]=='e'&&ch[2]=='r'&&ch[3]=='o')s2=s2*i;
            i=i*10;
            }
            if(ch[0]=='='&&(s1+s2==0))return 0;
            if(ch[0]=='='){printf("%d\n",s1+s2);break;}
        }

    }

    return 0;
}
