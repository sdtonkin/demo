using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core.Framework.Provisioning.Connectors;
using OfficeDevPnP.Core.Framework.Provisioning.Model;
using OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers;
using OfficeDevPnP.Core.Framework.Provisioning.Providers.Xml;
using System.Net;
using System.Security;
using System.Threading;
using System.Configuration;
using System.IO;
using System.Collections;
using System.Text.RegularExpressions;
using Microsoft.SharePoint.Client.Publishing;

namespace CI.Intranet.Deployment.Jobs
{
    public class RunProvisioningXml : JobBase 
    {
        private static ConsoleColor defaultForeground = ConsoleColor.DarkCyan;

        public RunProvisioningXml(string siteUrl, string domain, string userName, SecureString pwdS) : base(siteUrl, domain, userName, pwdS) {

        }
        public void Start(string fileName, DirectoryInfo directory, string options)
        {
            Console.WriteLine(fileName);
            Console.WriteLine(directory.FullName);
            using (var ctx = base.GetClientContext())
            {
                var template = ProvisioningHelper.GetProvisioningTemplateFromResourcePath(fileName, directory);
                ProvisioningHelper.ReportOnTemplateStats(template);
                if (options.ToLower().IndexOf("quiet") < 0)
                {
                    Console.WriteLine("");
                    Console.WriteLine("Continue (Y/N):");
                    string YesNo = Console.ReadLine();
                    if (YesNo.ToLower().IndexOf('n') >= 0)
                        return;
                }
                ProvisioningHelper.ApplyCustomTemplateToSite(defaultForeground, ctx, template);

            }
        }
    }
}
