pragma circom 2.0.0;

// [assignment] Modify the circuit below to perform a multiplication of three signals

template ModifiedTemp2 () {
   //signals
   signal input l;
   signal input m;
   signal output n; 
   
   // Constraints
   n <== l * m;
}
// component main {public [l,m]} = ModifiedTemp2();

template Multiplier3 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;
   signal input c;
   signal output d;  
   component m1 = ModifiedTemp2();
   component m2 = ModifiedTemp2();

   m1.l <== a;
   m1.m <== b;
   m2.l <== m1.n;
   m2.m <== c;
   d <== m2.n;
}

component main = Multiplier3();