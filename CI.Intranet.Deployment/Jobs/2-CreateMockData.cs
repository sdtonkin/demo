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
using Microsoft.SharePoint.Client.Taxonomy;

namespace CI.Intranet.Deployment.Jobs
{

    public class XMLTermItem
    {
        public XMLTermItem(string _name, string _Id) { Name = _name; Id = _Id; }
        public string Name { get; set; }
        public string Id { get; set; }
    }

    public class CreateMockData : JobBase
    {
        private static string DateTimeStamp = DateTime.Now.Year + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + "_" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + DateTime.Now.Minute.ToString().PadLeft(2, '0');
        private static ConsoleColor defaultForeground = ConsoleColor.DarkCyan;
        private static readonly String TEMPLATEDIRECTORYLOCATION = "../../Resources/Templates/";
        private static readonly String SITEURL = ConfigurationManager.AppSettings["SharePointSiteUrl"];
        private static readonly List<String> m_AudienceGuids = new List<string> { "493CE930-49DF-4623-AAD6-AE5D08F1E358", "A09AD401-994F-4D88-B53B-53D3DCEC45A2", "6141B466-CC08-4846-A8FF-F6805D1B182F", "41A7D2E9-D107-4FFF-99CD-59CFB3663104", "EB142AAD-F12E-44AC-AD40-40C591C59D3A", "9E5AAF26-3996-4454-B622-90DD96EBCB2C", "DAAA2F8F-FDD4-48DC-9346-CAF06DA38536", "99D36444-C749-4184-963D-EB49280FBD26", "2B226B06-6189-4244-8831-91F59F068993" };

        private static readonly List<String> m_Departments = new List<string> { "Team 1","Team 10","Team 11","Team 12","Team 13","Team 2","Team 3","Team 4",
"Team 5","Team 6","Team 7","Team 8","Team 9","Training-Education","Underwriting","Utilization Management","Vendor & Agency Management"};
        private static readonly List<String> m_Locations = new List<string> { "Alabama", "Alaska", "AL-Birmingham", "AL-Florence", "AL-Mobile", "AL-Montgomery", "AL-Tuscaloosa", "American Samoa", "Arizona", "Arkansas", "AR-Little Rock", "AZ-Bisbee", "AZ-Casa Grande", "AZ-Chandler", "AZ-Coolidge", "AZ-El Mirage" };
        private static readonly List<String> m_Organizations = new List<string> { "Absolute Total Care", "AcariaHealth Pharmacy", "Alabama Healthcare Advantage", "AR Marketplace", "Bridgeway Health Solutions", "Buckeye Community Health Plan", "California Health & Wellness", "CaseNet", "Celtic Insurance", "CeltiCare", "Cenpatico Arizona", "Cenpatico National" };
        private static readonly List<String> m_States = new List<string> { "IL", "OH", "VA", "SF", "IN", "FL", "AL", "AR", "CT", "GA", "HI", "GU", "DC" };


        public CreateMockData(string siteUrl, string domain, string userName, SecureString pwdS) : base(siteUrl, domain, userName, pwdS) {

        }

        /// <summary>
        /// Create news pages, articles etc..
        /// </summary>
        public void Start()
        {
            using (var ctx = base.GetClientContext()) {

                //Create News stories
                Console.WriteLine("Creating News stories...");
                CreateNewsStories(ctx);

                //Create data for official entities list
                Console.WriteLine("Adding mock data to Official Entities list...");
                CreateOfficialEntitiesDataByTerms(ctx);
            }
        }

        public static Microsoft.SharePoint.Client.Taxonomy.Term GetTermValue(ClientContext ctx, string termSetName, string termValue)
        {
            try
            {
                var session = TaxonomySession.GetTaxonomySession(ctx);
                var termStore = session.GetDefaultSiteCollectionTermStore();

                ctx.Load(termStore,
                         store => store.Groups.Include(group => group.TermSets));
                ctx.ExecuteQuery();

                ctx.Load(termStore.Groups);
                ctx.ExecuteQuery();

                var tGroup = termStore.Groups.FirstOrDefault(r => r.Name == "CNET");
                ctx.Load(tGroup.TermSets);
                ctx.ExecuteQuery();

                var navGroup = tGroup.TermSets.FirstOrDefault(r => r.Name == termSetName);
                ctx.Load(navGroup.Terms);
                ctx.ExecuteQuery();

                var term = navGroup.Terms.FirstOrDefault(r => r.Name == termValue);
                return term;
            }
            catch
            {
                throw;
            }
        }

        public static void SaveTaxonomyFieldValue(ClientContext ctx, ListItem oListItem, Microsoft.SharePoint.Client.FieldCollection fields, string internalName, string termLabel, string termGuid) {

            Microsoft.SharePoint.Client.Field field = fields.GetByInternalNameOrTitle(internalName);
            TaxonomyField txField = ctx.CastTo<TaxonomyField>(field);
            ctx.Load(txField, f => f.InternalName);
            ctx.ExecuteQuery();

            var termValue = new Microsoft.SharePoint.Client.Taxonomy.TaxonomyFieldValue();
            termValue.Label = termLabel;
            termValue.TermGuid = termGuid;
            termValue.WssId = -1;

            txField.SetFieldValueByValue(oListItem, termValue);
        }

        public static void SaveTaxonomyFieldValueCollection(ClientContext ctx, ListItem oListItem, Microsoft.SharePoint.Client.FieldCollection fields, string internalName, string termLabel, string termGuid)
        {
            List<XMLTermItem> terms = new List<XMLTermItem>();
            var term = new XMLTermItem(termLabel, termGuid);
            terms.Add(term);
            SaveTaxonomyFieldValueCollection(ctx, oListItem, fields, internalName, terms);
        }

        public static void SaveTaxonomyFieldValueCollection(ClientContext ctx, ListItem oListItem, Microsoft.SharePoint.Client.FieldCollection fields, string internalName, List<XMLTermItem> terms)
        {
            Microsoft.SharePoint.Client.Field field = fields.GetByInternalNameOrTitle(internalName);
            TaxonomyField txField = ctx.CastTo<TaxonomyField>(field);
            ctx.Load(txField, f => f.InternalName);
            ctx.ExecuteQuery();

            string termValueString = "";
            for (int i = 0; i < terms.Count;  i++)
            {
                termValueString += "-1;#" + terms[i].Name + "|" + terms[i].Id.ToString() + ";#";
            }

            var termValues = new TaxonomyFieldValueCollection(ctx, termValueString.Remove(termValueString.Length - 2), txField);
            txField.SetFieldValueByValueCollection(oListItem, termValues);
        }
        /// <summary>
        /// Creates news story pages
        /// </summary>
        private static void CreateNewsStories(ClientContext ctx)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Creates/returns News subsite obj.
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private static Web CreateOrGetNewsSite(ClientContext ctx)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Adds items to the official entities list.
        /// </summary>
        private static void CreateMockDataForOfficialEntitiesList(ClientContext ctx, Microsoft.SharePoint.Client.Taxonomy.Term term, int index)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Returns navigation item from termstore.
        /// </summary>
        /// <param name="navigationPath"></param>
        /// <returns></returns>
        public static void CreateOfficialEntitiesDataByTerms(ClientContext ctx)
        {
            try
            {
                var session = TaxonomySession.GetTaxonomySession(ctx);
                var termStore = session.GetDefaultSiteCollectionTermStore();

                ctx.Load(termStore,
                            store => store.Groups.Include(group => group.TermSets));
                ctx.ExecuteQuery();

                ctx.Load(termStore.Groups);
                ctx.ExecuteQuery();

                var tGroup = termStore.Groups.FirstOrDefault(r => r.Name == "CNET");
                ctx.Load(tGroup.TermSets);
                ctx.ExecuteQuery();

                var navGroup = tGroup.TermSets.FirstOrDefault(r => r.Name == "Audience");
                ctx.Load(navGroup.Terms);
                ctx.ExecuteQuery();

                foreach (var term in navGroup.Terms)
                {
                    try
                    {
                        //var term = navGroup.Terms.FirstOrDefault(r => r.Name == aud);
                        ctx.Load(term, r => r.Terms);
                        ctx.ExecuteQuery();
                        //return term.Terms.Count > 0 ? term.Terms.First() : null;
                        if (term.Terms.Count > 1)
                        {
                            for (int i = 0; i < term.Terms.Count; i++)
                                CreateMockDataForOfficialEntitiesList(ctx, term.Terms[i], i);
                        }
                        else
                            CreateMockDataForOfficialEntitiesList(ctx, term, 0);
                    }
                    catch { continue; }
                }
            }
            catch
            {

                throw;
            }
        }
    }
}
