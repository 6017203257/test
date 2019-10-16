#include<iostream>
#include<windows.h>
using namespace std;
int fact(int m,int n)
{
if(n==0)return m;
return fact(n,m%n);
}
class Rational
{
private:
int numerator;
int denominator;
public:
Rational(int n=0,int d=1)//带默认参数的构造函数，整数与分数的运算迎刃而解
{
numerator=n;
denominator=d;
}
friend ostream& operator<<(std::ostream&, const Rational&); //重载输出
friend istream& operator>>(std::istream&, Rational&); //重载输入
friend bool operator==(const Rational&, const Rational&); //判断有理数是否相等，以下类似
friend bool operator<(const Rational&, const Rational&);
friend bool operator>(const Rational&, const Rational&);
friend bool operator>=(const Rational&, const Rational&);
friend bool operator<=(const Rational&, const Rational&);
friend Rational operator +(const Rational&,const Rational&);//重载运算符
friend Rational operator -(const Rational&,const Rational&);
friend Rational operator *(const Rational&,const Rational&);
friend Rational operator /(const Rational&,const Rational&);
friend bool operator!=(const Rational&, const Rational&);
};
Rational operator +(const Rational &a,const Rational &b)
{
Rational p;
p.numerator=a.numerator*b.denominator+b.numerator*a.denominator;
p.denominator=a.denominator*b.denominator;
return p;
}
Rational operator -(const Rational &a,const Rational &b)
{
Rational p;
p.numerator=a.numerator*b.denominator-b.numerator*a.denominator;
p.denominator=a.denominator*b.denominator;
return p;
}
Rational operator *(const Rational &a,const Rational &b)
{
Rational p;
p.numerator=a.numerator*b.numerator;
p.denominator=a.denominator*b.denominator;
return p;
}
Rational operator /(const Rational &a,const Rational &b)
{
Rational p;
p.numerator=a.numerator*b.denominator;
p.denominator=a.denominator*b.numerator;
return p;
}
ostream& operator<<(ostream& output,const Rational &num)
{
int a=fact(num.numerator,num.denominator);
if((num.denominator/a)==1)
output<<num.numerator/a;
else if(num.denominator/a<0)
output<<-num.numerator/a<<"/"<<-num.denominator/a;
else output<<num.numerator/a<<"/"<<num.denominator/a;
return output;
}

istream& operator>>(istream&input, Rational& num)
{
input>>num.numerator>>num.denominator;
return input;
}
bool operator==(const Rational&num1, const Rational&num2)
{
return (num1.numerator*num2.denominator)==(num2.numerator*num1.denominator);
}
bool operator!=(const Rational &num1, const Rational &num2)
{
return (num1.numerator*num2.denominator)!=(num2.numerator*num1.denominator);
}

bool operator<(const Rational&a, const Rational&b)
{
return (a.numerator*b.denominator)<(b.numerator*a.denominator);
}
bool operator>(const Rational&a, const Rational&b)
{
return (a.numerator*b.denominator)>(b.numerator*a.denominator);
}
bool operator<=(const Rational&a, const Rational&b)
{
return (a.numerator*b.denominator)<=(b.numerator*a.denominator);
}
bool operator>=(const Rational&a, const Rational&b)
{
return (a.numerator*b.denominator)>=(b.numerator*a.denominator);
}
int main()
{
Rational a(3,7),b(5,8);
Rational p;
cout<<"a="<<a<<"\nb="<<b<<'\n' ;
Sleep(1000);
cout<<"(a==b)="<<(a==b)<<"\n(a<b)="<<(a<b)<<endl ;
Sleep(1000);
cout<<"a+b="<<a+b<<endl;
Sleep(1000);
cout<<"a*b="<<a*b<<endl;
Sleep(1000);
cout<<"b-a="<<b-a<<endl;
Sleep(1000);
cout<<"a-b="<<a-b<<endl;
Sleep(1000);
cout<<"a/b="<<a/b<<endl;
Sleep(1000);
return 0;
}




