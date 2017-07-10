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
    public class GetProvisioningXml : JobBase
    {
        private static string DateTimeStamp = DateTime.Now.Year + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + "_" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + DateTime.Now.Minute.ToString().PadLeft(2, '0');
        private static ConsoleColor defaultForeground = ConsoleColor.DarkCyan;

        public GetProvisioningXml(string siteUrl, string domain, string userName, SecureString pwdS) : base(siteUrl, domain, userName, pwdS) {

        }
        public void Start(string outputFolder)
        {
            using (var ctx = base.GetClientContext())
            {                
                // GET the template from existing site and serialize it
                ProvisioningTemplate template = ProvisioningHelper.GenerateProvisioningTemplate(defaultForeground, ctx, outputFolder, "SiteExport_" + DateTimeStamp + ".xml");
            }
        }

    }
}
