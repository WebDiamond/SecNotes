 ESECUZIONE ARRAY

             La  vecchia  metodologia dell' inline del  Turbo  Pascal  e' 
        applicabile anche con il C mediante l'esecuzione di un array.
             Stavo scrivendo un testo sull'aritmetica degli indirizzi per 
        un corso che dovro tenere tra qualche mese.
             Tra  i  vari  cast che sono possibili in C mi  e'  sorto  un 
        dubbio.
             Se assegni l'indirizzo di un array a un puntatore a funzione 
        e chiami la funzione che cosa capita ?
             In  pratica:  traduci  un codice assembler  in  esadecimale, 
        assegna i valori a un array,  assegna l'indirizzo dell'array a un 
        puntatore a funzione mediante un cast e chiama la funzione.
        Esempio:

        unsigned char far array[] = {
                                /* ---- [CODICE  DI BOOT.COM] ---- */
                0xFB,0x31,0xDB, /* FB            STI               */
                0x8E,0xDB,0xBB, /* 31DB          XOR     BX,BX     */
                0x72,0x04,0xB8, /* 8EDB          MOV     DS,BX     */
                0x34,0x12,0x89, /* BB7204        MOV     BX,0472   */
                0x07,0xEA,0x00, /* B83412        MOV     AX,1234   */
                0x00,0xFF,0xFF  /* 8907          MOV     [BX],AX   */
                                /* EA0000FFFF    JMP     FFFF:0000 */
                                /* ------------------------------- */
        };

        void    main(void)
        {
                void (far *funct)() = (void(far *)()) array;
                (*funct)();
        }

             Ho  provato  anche  mediante assegnazione  da  programma  in 
        esecuzione e funziona.
        Supponiamo  di dover creare una funzione che esegua un JMP (jump) 
        a un indirizzo assoluto composto da segmento e dall'offset.
        Utilizzando il metodo dell'esecuzione degli array potremmo fare:

        #define JMPCODE         0xEA    /* Codice esa di JMP FAR */
        #define NULL            0x00

        void    jump(unsigned segment,unsigned offset)
        {
                static unsigned char instruct[5] = {    JMPCODE,
                                                        NULL,
                                                        NULL,
                                                        NULL,
                                                        NULL
                                                   };
                void (far *funct)() = (void (far *)()) instruct;
                (*((unsigned *) &instruct[1])) = offset;
                (*((unsigned *) &instruct[3])) = segment;
                (*funct)();
        }
