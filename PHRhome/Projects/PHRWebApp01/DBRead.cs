using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

using MySql.Data.MySqlClient;
using MySql.Data;


/// <summary>
/// Read console information from a SQL database
/// </summary>
public class DBRead
{
    MySqlConnection Connect;
    MySqlCommand Command;
    public MySqlDataReader Results;
    string sSQL, sQuery = "", sSort = "", sName = "";
    ulong nResults;
    int x;

    public DBRead(string sConn="", string sDB="")
	{
        if (sConn == null || sConn == "")
            sConn = "server=localhost; user=root; Convert Zero Datetime=True; database=";
        if (sDB == null || sDB == "")
            sDB = "vg_list";
        this.Connect = new MySqlConnection(sConn+sDB+";");
        //this.sSQL = "SELECT * FROM Consoles;";
	}

    public MySqlDataReader Print(string sTable = "Consoles", string sCol = "sName", string sQ = "")
    {
        if (Connect.State != ConnectionState.Open)
        {
            this.Open();
        }
        Command = new MySqlCommand("SELECT * FROM " + sTable + " WHERE @col LIKE CONCAT('%', @query, '%');", Connect);
        //Command.Parameters.AddWithValue("table", sTable);
        Command.Parameters.AddWithValue("col", sCol);
        Command.Parameters.AddWithValue("query", sQ);

        return Command.ExecuteReader();
    }

    public void Open()
    {
        Connect.Open();
        Console.WriteLine("Database successfully opened.");
    }
    public void Close()
    {
        Connect.Close();
        Console.WriteLine("Database successfully closed.");
    }
}
