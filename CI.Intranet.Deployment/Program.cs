using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace CI.Intranet.Deployment
{
    class Program
    {
        private static ConsoleColor defaultForeground = ConsoleColor.DarkCyan;
        private static readonly String TEMPLATEDIRECTORYLOCATION = "../../Templates/";
        private static readonly String GROUPSTEMPLATEDIRECTORYLOCATION = "../../Templates/Sections/Groups";
        static void Main(string[] args)
        {
            
            string defaultSiteUrl = ConfigurationManager.AppSettings["SharePointSiteUrl"];
            string defaultUserName = ConfigurationManager.AppSettings["UserName"];
            string defaultPassword = ConfigurationManager.AppSettings["Password"];
            //string defaultDomain = ConfigurationManager.AppSettings["Domain"];

            if (args.Length > 0)
            {
                if (args[0] == "autodeploy")
                {
                    SecureString pwd1 = new SecureString();
                    foreach (char c in defaultPassword.ToCharArray()) pwd1.AppendChar(c);
                    var domain = string.Empty;
                    var files = new DirectoryInfo("CI.Intranet.Deployment/Templates");
                    var fileNames = "1-TermSet.xml,2-InformationArchitecture.xml,3-Files.xml".Split(',');

                    foreach(var file in fileNames)
                    {
                        var rJob = new Jobs.RunProvisioningXml(defaultSiteUrl, domain, defaultUserName, pwd1);
                        rJob.Start(file, files, "quiet");
                    }
                    
                    return;
                }
            }

            Console.WriteLine("Default Site Url: " + defaultSiteUrl);
            //Console.WriteLine("Default Domain: " + defaultDomain);
            Console.WriteLine("Default Username: " + defaultUserName);
            Console.WriteLine("Default Password: (in config file)");

            // Collect information 
            string siteUrl = GetInput("Enter the URL of the SharePoint site (enter to use default)", false, defaultForeground);
            //string domain = GetInput("Enter your domain (enter to use default)", false, defaultForeground);
            string userName = GetInput("Enter your user name (enter to use default)", false, defaultForeground);
            string pwdS = GetInput("Enter your password (enter to use default)", true, defaultForeground);

            if (string.IsNullOrEmpty(siteUrl))
                siteUrl = defaultSiteUrl;
            /*
            if (string.IsNullOrEmpty(domain))
                domain = defaultDomain;
            */
            if (string.IsNullOrEmpty(userName))
                userName = defaultUserName;


            if (string.IsNullOrEmpty(pwdS))
                pwdS = defaultPassword;

            SecureString pwd = new SecureString();
            foreach (char c in pwdS.ToCharArray()) pwd.AppendChar(c);


            ClientContext ctx;
            ctx = new OfficeDevPnP.Core.AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant(siteUrl, userName, pwdS);

            // Test connection by outputing the site title
            Web web = ctx.Web;
            ctx.Load(web, w => w.Title);
            ctx.Load(web, w => w.Url);
            ctx.ExecuteQueryRetry();

            Console.WriteLine("Site Title: {0}", web.Title);
            Console.WriteLine("Site URL: {0}", web.Url);

            DisplayJobRunOptions(siteUrl, "", userName, pwd, "");

            // Pause and modify the UI to indicate that the operation is complete
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("We're done. Press Enter to continue.");
            Console.ReadLine();
        }
        public static void DisplayJobRunOptions(string siteUrl, string domain, string userName, SecureString pwd, string RunMode = "")
        {
            string options = "";

            Console.WriteLine("");
            if (string.IsNullOrEmpty(RunMode))
            {
                Console.WriteLine("0 - Get Provisioning Template");
                Console.WriteLine("1 - Provision Full Site Template");
                Console.WriteLine("2 - Provision Group Sites");
                Console.WriteLine("3 - Import Data Items");
                Console.WriteLine("4 - Create Sites and Subsites");
                Console.WriteLine("  (N/A) - Migrate News");

                Console.WriteLine("");
                Console.WriteLine("Select a Run Mode:");
                RunMode = Console.ReadLine();

                options = RunMode.GetRightHalf("-").Trim();
                RunMode = RunMode.GetLeftHalf("-").Trim();
            }

            BeginRunJob(siteUrl, domain, userName, pwd, RunMode, options);
        }
        private static string GetInput(string label, bool isPassword, ConsoleColor defaultForeground)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("{0} : ", label);
            Console.ForegroundColor = defaultForeground;

            string value = "";

            for (ConsoleKeyInfo keyInfo = Console.ReadKey(true); keyInfo.Key != ConsoleKey.Enter; keyInfo = Console.ReadKey(true))
            {
                if (keyInfo.Key == ConsoleKey.Backspace)
                {
                    if (value.Length > 0)
                    {
                        value = value.Remove(value.Length - 1);
                        Console.SetCursorPosition(Console.CursorLeft - 1, Console.CursorTop);
                        Console.Write(" ");
                        Console.SetCursorPosition(Console.CursorLeft - 1, Console.CursorTop);
                    }
                }
                else if (keyInfo.Key != ConsoleKey.Enter)
                {
                    if (isPassword)
                    {
                        Console.Write("*");
                    }
                    else
                    {
                        Console.Write(keyInfo.KeyChar);
                    }
                    value += keyInfo.KeyChar;

                }

            }
            Console.WriteLine("");

            return value;
        }
        public static void BeginRunJob(string siteUrl, string domain, string userName, SecureString pwd, string RunMode, string options)
        {
            switch (RunMode)
            {
                case "0":
                    string defaultExportFolder = (ConfigurationManager.AppSettings["ExportTemplateFolder"]).TrimEnd('\\');
                    Console.WriteLine(Environment.NewLine);
                    Console.WriteLine("Default Output Folder: " + defaultExportFolder);

                    string outputFolder = GetInput("Enter an output folder (enter to use default): ", false, defaultForeground);

                    if (string.IsNullOrEmpty(outputFolder))
                        outputFolder = defaultExportFolder;

                    var pJob = new Jobs.GetProvisioningXml(siteUrl, domain, userName, pwd);
                    pJob.Start(outputFolder);
                    break;

                case "1":
                    Console.WriteLine("By Default, Provisioning Templates will be source from the 'Resources' Folder within this project.");
                    //string defaultProvisioningTemplateDeploymentFolder = (ConfigurationManager.AppSettings["ProvisioningTemplateDeploymentFolder"]).TrimEnd('\\');
                    //if (string.IsNullOrEmpty(defaultProvisioningTemplateDeploymentFolder))
                    //  defaultProvisioningTemplateDeploymentFolder = ProvisioningHelper.GetDeploymentResourcesPath();

                    Console.WriteLine("Default Resource directory Path: " + TEMPLATEDIRECTORYLOCATION);  //defaultProvisioningTemplateDeploymentFolder);
                                                                                                         //string filePath = GetInput("Enter a new File Path (enter to use default): ", false, defaultForeground);

                    //if (string.IsNullOrEmpty(filePath))
                    //  filePath = defaultProvisioningTemplateDeploymentFolder;

                    List<FileInfo> FilesToProcess = DisplayFileTemplateOptions(TEMPLATEDIRECTORYLOCATION, SearchOption.TopDirectoryOnly);
                    if (FilesToProcess.Count() <= 0)
                    {
                        Console.WriteLine("No Files Selected.");
                        return;
                    }
                    var rJob = new Jobs.RunProvisioningXml(siteUrl, domain, userName, pwd);

                    foreach (var FileToProcess in FilesToProcess)
                    {
                        Console.WriteLine();
                        Console.WriteLine("Processing ... " + FileToProcess.Name);
                        if (ValidateSubSiteXml(siteUrl, domain, userName, pwd, FileToProcess.Name))
                        {
                            options = "quiet";
                            rJob.Start(FileToProcess.Name, FileToProcess.Directory, options);
                        }
                        else
                        {
                            WriteErrorToScreen("Attempted to deploy subsite Xml to the root web.  Please enter a subsite URL when running the deployment.");
                        }


                    }
                    break;
                case "2":
                    List<FileInfo> groupsToProcess = DisplayFileTemplateOptions(GROUPSTEMPLATEDIRECTORYLOCATION, SearchOption.TopDirectoryOnly);
                    if (groupsToProcess.Count() <= 0)
                    {
                        Console.WriteLine("No Files Selected.");
                        return;
                    }
                    var mJob = new Jobs.ProvisionGroupSites(domain, userName, pwd);
                    foreach (var FileToProcess in groupsToProcess)
                    {
                        Console.WriteLine();
                        Console.WriteLine("Processing ... " + FileToProcess.Name);
                        if (ValidateSubSiteXml(siteUrl, domain, userName, pwd, FileToProcess.Name))
                        {
                            options = "quiet";
                            mJob.Start(FileToProcess.Name, FileToProcess.Directory);
                        }
                        else
                        {
                            WriteErrorToScreen("Attempted to deploy Xml to a group site.");
                        }


                    }
                    break;
                case "3":
                    var nJob = new Jobs.SubmissionImporter(siteUrl, domain, userName, pwd);
                    nJob.Start();
                    break;
                case "4":
                    var sJob = new Jobs.CreateSitesAndSubsites(siteUrl, domain, userName, pwd);
                    sJob.Start();
                    break;
            }
        }
        public static List<System.IO.FileInfo> DisplayFileTemplateOptions(string filePath, SearchOption searchOption)
        {
            List<System.IO.FileInfo> output = new List<System.IO.FileInfo>();

            Console.WriteLine("");
            var files = System.IO.Directory.GetFiles(filePath, "*.xml", searchOption);

            for (int i = 0; i < files.Length; i++)
            {
                Console.WriteLine(string.Format("{0} - {1}", i + 1, files[i].GetRightHalf("\\Resources\\")));
            }

            Console.WriteLine("");
            Console.WriteLine("Select File Number(s) (comma-separated or * for all):");
            string fileNumberInput = Console.ReadLine();
            fileNumberInput = fileNumberInput.Trim();
            if (string.IsNullOrEmpty(fileNumberInput))
                return output;

            if (fileNumberInput == "*")
            {
                foreach (var file in files)
                {
                    output.Add(new System.IO.FileInfo(file));
                }
            }
            else
            {
                var fileNumberStrings = fileNumberInput.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var fileNumberString in fileNumberStrings)
                {
                    System.IO.DirectoryInfo d = new System.IO.DirectoryInfo(filePath);
                    int index = -1;
                    if (int.TryParse(fileNumberString, out index))
                    {
                        if ((index - 1) < 0 || (index - 1) >= files.Length)
                            Console.WriteLine("  '" + fileNumberString + "' is not a valid selection.");
                        else
                            output.Add(new System.IO.FileInfo(files[index - 1]));
                    }
                    else
                        Console.WriteLine("  '" + fileNumberString + "' is not a number");
                }
            }

            return output;
        }
        public static bool ValidateSubSiteXml(string siteUrl, string domain, string userName, SecureString pwdS, string fileName)
        {
            if (!fileName.ToLower().Contains("subsite"))
                return true;

            ClientContext ctx;

            if (string.IsNullOrEmpty(domain))
                ctx = new OfficeDevPnP.Core.AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant(siteUrl, userName, pwdS);
            else
                ctx = new OfficeDevPnP.Core.AuthenticationManager().GetNetworkCredentialAuthenticatedContext(siteUrl, userName, pwdS, domain);

            // Just to output the site details
            Web web = ctx.Web;
            ctx.Load(web, w => w.Title, w => w.Id);
            var site = ctx.Site;
            ctx.Load(site, s => s.RootWeb, s => s.RootWeb.Id);
            ctx.ExecuteQueryRetry();
            if (ctx.Web.Id == ctx.Site.RootWeb.Id)
                return false;

            return true;
        }
        private static void WriteErrorToScreen(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(message);
            Console.ForegroundColor = defaultForeground;
        }
    }
    public class Args
    {
        public Args(string[] args)
        {

        }
    }
}
