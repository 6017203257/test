#include<stdio.h>
int main()
{
    int a[10000],x=0,z,n,i,j,max,b[10000],c[10000],d[10000],m=0,num1,num2,q=0;
    scanf("%d",&n);
    for(i=2;i<n;i++)
    {
        z=0;
        for(j=2;j<i;j++)
        {
            if(i%j==0)
            {
            z=1;
            break;
            }
        }
        if(z==0)
        {
            a[x]=i;
            x++;
        }
    }

        for(i=0;i<=x;i++)
        {
            for(j=i+1;j<=x;j++)
            {
                if(a[i]+a[j]==n)
                {
                    b[m]=a[j]-a[i];
                    c[m]=a[i];
                    d[m]=a[j];
                    m++;
                    break;
                }
            }
        }
        max=b[0];
        num1=c[0];
        num2=d[0];
        for(i=0;i<m;i++)
        {
            if(b[i]<b[i+1])
            {
                max=b[i+1];
                q=i+1;
            }
        }
        num1=c[q];
        num2=d[q];
        printf("%d=%d+%d\n",n,num1,num2);

    return 0;
}
