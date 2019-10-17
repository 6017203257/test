#include <stdio.h>
#include <ctype.h>

void ClearBuff()
{
	int ch;

	while( (ch = getchar()) != '\n')
	continue;
}

int main(void)
{
    int ch = 0, guess = 50, begin = 1, end = 100;

    printf("我猜,你的数字是: %d ,对吗?\n", guess); 
    while ((ch = getchar()) != EOF)
    {
    	if( (ch <= ' ') || (ch == '\t') )
		{
			continue;
		}

		if(isalpha(ch))
		{
			if(isupper(ch))
			{
				ch = ch + 32;
			}
		}

    	if( 'y' == ch )
    	{
    		puts("哈哈我猜对了!");
            ClearBuff();
			break; 
		}

    	switch(ch)
    	{
		    case 'g':
            end = guess;
            guess = (begin + end) / 2;
            printf("我猜,你的数字是: %d ,对吗?\n", guess);
            ClearBuff();
            break;

            case 'l':
            begin = guess;
            guess = (begin + end) / 2;
            printf("我猜,你的数字是: %d ,对吗?\n", guess);
            ClearBuff();
            break;

            case 'n':
          	puts("做人要诚信!");
            begin = 1;
            end = 100;
            guess = 50;
            printf("我猜,你的数字是: %d ,对吗?\n", guess);
            ClearBuff();
            break;

		    default:
           	puts("我看不懂你在说什么!");
        	ClearBuff();
        	break;
		}
    }

    puts("再见!");

    return 0;
}