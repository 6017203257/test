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

    printf("�Ҳ�,���������: %d ,����?\n", guess); 
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
    		puts("�����Ҳ¶���!");
            ClearBuff();
			break; 
		}

    	switch(ch)
    	{
		    case 'g':
            end = guess;
            guess = (begin + end) / 2;
            printf("�Ҳ�,���������: %d ,����?\n", guess);
            ClearBuff();
            break;

            case 'l':
            begin = guess;
            guess = (begin + end) / 2;
            printf("�Ҳ�,���������: %d ,����?\n", guess);
            ClearBuff();
            break;

            case 'n':
          	puts("����Ҫ����!");
            begin = 1;
            end = 100;
            guess = 50;
            printf("�Ҳ�,���������: %d ,����?\n", guess);
            ClearBuff();
            break;

		    default:
           	puts("�ҿ���������˵ʲô!");
        	ClearBuff();
        	break;
		}
    }

    puts("�ټ�!");

    return 0;
}