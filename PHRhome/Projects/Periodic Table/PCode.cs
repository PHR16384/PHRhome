using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHRhome.Projects.Periodic_Table
{
    public class PCode
    {
        public static char[] arcBlock = {'s','p','d','f','g'};
        public int B, P;
        private int b, p;   //loop vars

        public PCode()
        {
            this.B = arcBlock.Length;
            this.P = 9;
        }
    }
}