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
        private static readonly String TEMPLATEFILELOCATION = "../../Resources/Templates/CenteneSiteCollectionTemplate.xml";
        private static readonly String TEMPLATEDIRECTORYLOCATION = "../../Resources/Templates/";
        private static readonly String SITEURL = ConfigurationManager.AppSettings["SharePointSiteUrl"];

        //0-"LifeShare"
        //1-"Envolve People Care"
        //2-"California Health ＆ Wellness"
        //3-"Claims Farmington, MO"
        //4-"Buckeye Health Plan"
        //5-"Corporate"
        //6-"Centene In The News"
        //7-"Industry News"
        //8-"Company News"
        private static readonly List<String> m_Audience = new List<string> { "LifeShare", "Envolve People Care", "California Health ＆ Wellness", "Claims Farmington, MO", "Buckeye Health Plan", "Corporate", "Centene In The News", "Industry News", "Company News" };
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
            try
            {
                var web = ctx.Web;
                ctx.Load(web);
                ctx.ExecuteQuery();
                if (!ctx.Site.RootWeb.IsObjectPropertyInstantiated("ServerRelativeUrl"))
                {
                    ctx.Load(ctx.Site.RootWeb, w => w.ServerRelativeUrl);
                    ctx.ExecuteQuery();
                }
                PublishingWeb pub = PublishingWeb.GetPublishingWeb(ctx, web);
                ctx.Load(web);
                string pageLayout = "cnet_NewsStory";

                List publishingLayouts = ctx.Site.RootWeb.Lists.GetByTitle("Master Page Gallery");
                ListItemCollection allItems = publishingLayouts.GetItems(CamlQuery.CreateAllItemsQuery());
                ctx.Load(allItems, items => items.Include(item => item.DisplayName).Where(obj => obj.DisplayName == pageLayout));
                ctx.ExecuteQuery();
                ListItem layout = allItems.Where(x => x.DisplayName == pageLayout).FirstOrDefault();
                if (layout == null)
                    throw new Exception("Layout (" + pageLayout + ") not found");

                ctx.Load(layout);
                var list = web.Lists.GetByTitle("Pages");
                ctx.Load(list);
                ctx.ExecuteQuery();

                Microsoft.SharePoint.Client.FieldCollection fields = list.Fields;
                ctx.Load(fields);


                var arrImages = new string[] {
                    "/_catalogs/masterpage/CNET/imgs/NewsImage.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_1.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_2.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_3.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_4.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_5.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_6.png",
                    "/_catalogs/masterpage/CNET/imgs/NewsImage_small_7.png",
                    "/_catalogs/masterpage/CNET/img/Samples/sample2.jpg",
                    "/_catalogs/masterpage/CNET/img/Samples/sample3.jpg",
                    "/_catalogs/masterpage/CNET/imgs/FeaturedStory_1.png",
                    "/_catalogs/masterpage/CNET/imgs/FeaturedStory_2.png",
                };
                var date = DateTime.Now;
                String imageURL = null;
                int i = 1;
                while (i <= 15)
                {
                    string pageName = string.Format("NewsArticle{0}", i);

                    //CreatePublishingPage(ctx, , "CNET_NewsStory", date, imageURL);
                    var page = pub.AddPublishingPage(new PublishingPageInformation { PageLayoutListItem = layout, Folder = list.RootFolder, Name = pageName + ".aspx" });
                    ctx.ExecuteQuery();

                    //var pg = AddNewsPageProperties(page, date, imageURL);
                    page.ListItem["Title"] = "Lorem ipsum dolor sit amet";
                    page.ListItem["Comments"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec enim at quam venenatis maximus. Nulla porta venenatis nisl, nec fringilla mauris fermentum luctus. Duis quis nisi mi." + pageName;
                    page.ListItem["PublishingPageContent"] = "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec enim at quam venenatis maximus. Nulla porta venenatis nisl, nec fringilla mauris fermentum luctus. Duis quis nisi mi. Sed at risus quis odio viverra euismod. Morbi non aliquam odio, a efficitur odio. Vestibulum enim diam, lacinia sed congue in, dictum congue diam. In tristique justo quis tortor feugiat, id rutrum metus hendrerit. Pellentesque faucibus malesuada libero aliquam cursus. Sed at est quam. Aliquam sit amet laoreet erat. Donec tristique vel magna quis aliquam. Praesent molestie turpis in ultrices aliquam. Nam sed sem sit amet ante scelerisque rhoncus. Vestibulum eget euismod ipsum. Curabitur quis porta velit. Sed finibus ipsum at pharetra ornare. Nunc ut risus gravida, hendrerit quam eu, lobortis dolor. Fusce vel blandit enim. Aenean tempor erat eu ante dictum, in dignissim risus fermentum. Integer facilisis ipsum efficitur magna viverra, ac suscipit massa vulputate. Integer quis lobortis urna, ut auctor lectus. Nullam nec libero molestie, suscipit velit quis, aliquam sapien. Sed ac magna id enim rutrum condimentum. Suspendisse aliquam ut sem ac tincidunt. Maecenas nisi purus, dapibus sit amet erat eu, mattis ornare mauris. Fusce ut nisl vulputate, viverra odio vitae, venenatis enim. Aliquam erat volutpat. Pellentesque facilisis gravida felis eu tempor. Morbi interdum sodales augue euismod facilisis. Sed mi risus, semper ut ultrices eu, rutrum id risus. Nulla facilisis felis sit amet molestie ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur eget massa nunc. Praesent sed vehicula ex." + pageName + "</div>";
                    page.ListItem["ArticleByLine"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec enim at quam venenatis maximus. Nulla porta venenatis nisl, nec fringilla mauris fermentum luctus. Duis quis nisi mi.";
                    page.ListItem["ArticleStartDate"] = date;
                    //imageURL = i % 2 == 0 ? (i < 20 ? arrImages[0] : arrImages[1]) : arrImages[2];

                    List<XMLTermItem> audienceTerms = new List<XMLTermItem>();
                    //0-"LifeShare"
                    //1-"Envolve People Care"
                    //2-"California Health ＆ Wellness"
                    //3-"Claims Farmington, MO"
                    //4-"Buckeye Health Plan"
                    //5-"Corporate"
                    //6-"Centene In The News"
                    //7-"Industry News"
                    //8-"Company News"
                    switch (i)
                    {
                        case 1:
                            page.ListItem["Title"] = "Join us to learn more about your benefits";
                            audienceTerms.Add(new XMLTermItem(m_Audience[8], m_AudienceGuids[8]));
                            imageURL = arrImages[0];
                            break;
                        case 2:
                            page.ListItem["Title"] = "Centene Online Store is Now Open";
                            audienceTerms.Add(new XMLTermItem(m_Audience[8], m_AudienceGuids[8]));
                            imageURL = arrImages[4];
                            break;
                        case 3:
                            page.ListItem["Title"] = "Welcome New Hires! Monday, August 15 2016";
                            audienceTerms.Add(new XMLTermItem(m_Audience[8], m_AudienceGuids[8]));
                            break;
                        case 4:
                            page.ListItem["Title"] = "Read About Dr. Mary Mason, One of the Area's Most Influential Business Women";
                            audienceTerms.Add(new XMLTermItem(m_Audience[8], m_AudienceGuids[8]));
                            imageURL = arrImages[5];
                            break;
                        case 5:
                            page.ListItem["Title"] = "Meet and Greet: Karin Bartley";
                            audienceTerms.Add(new XMLTermItem(m_Audience[0], m_AudienceGuids[0]));
                            imageURL = arrImages[1];
                            break;
                        case 6:
                            page.ListItem["Title"] = "Meet and Greet: Sarah Triano";
                            audienceTerms.Add(new XMLTermItem(m_Audience[1], m_AudienceGuids[1]));
                            break;
                        case 7:
                            page.ListItem["Title"] = "CH&W Launched Community Connections Forum in El Dorado Country";
                            audienceTerms.Add(new XMLTermItem(m_Audience[2], m_AudienceGuids[2]));
                            imageURL = arrImages[6];
                            break;
                        case 8:
                            page.ListItem["Title"] = "Centene Invests in Community, Employees";
                            audienceTerms.Add(new XMLTermItem(m_Audience[3], m_AudienceGuids[3]));
                            imageURL = arrImages[2];
                            break;
                        case 9:
                            page.ListItem["Title"] = "Centene's Subsidiary Awarded TRICARE West Region Contract";
                            audienceTerms.Add(new XMLTermItem(m_Audience[6], m_AudienceGuids[6]));
                            imageURL = arrImages[7];
                            break;
                        case 10:
                            page.ListItem["Title"] = "Dad: Little World, Big Deal";
                            audienceTerms.Add(new XMLTermItem(m_Audience[6], m_AudienceGuids[6]));
                            break;
                        case 11:
                            page.ListItem["Title"] = "Retirees Need $130,000 Just to Cover Health Care, Study Finds Aug 18, 2016";
                            audienceTerms.Add(new XMLTermItem(m_Audience[7], m_AudienceGuids[7]));
                            break;
                        case 12:
                            page.ListItem["Title"] = "Blue Cross Blue Shield Won't Credit Land of Lincoln Members for Deductibles";
                            audienceTerms.Add(new XMLTermItem(m_Audience[7], m_AudienceGuids[7]));
                            imageURL = arrImages[3];
                            break;
                        case 13:
                            page.ListItem["Title"] = "Fingers Crossed?  Insurer Checks if Clients Lie About Smoking";
                            audienceTerms.Add(new XMLTermItem(m_Audience[7], m_AudienceGuids[7]));
                            imageURL = arrImages[8];
                            break;
                        default:
                            break;
                    }
                    page.ListItem["PublishingPageImage"] = "<IMG src=\"" + imageURL + "\" alt=\"News Article " + i + "\">";

                    //ctx.Load(page);
                    page.ListItem.Update();
                    ctx.ExecuteQuery();
                    if (audienceTerms.Count > 0) {
                        SaveTaxonomyFieldValue(ctx, page.ListItem, fields, "CNCMainAudience", audienceTerms[0].Name, audienceTerms[0].Id);
                        page.ListItem.Update();
                        ctx.ExecuteQuery();
                        SaveTaxonomyFieldValueCollection(ctx, page.ListItem, fields, "CNCTargetAudiences", audienceTerms);
                        page.ListItem.Update();
                        ctx.ExecuteQuery();
                    }

                    page.ListItem.File.CheckIn("Adding new article", CheckinType.MajorCheckIn);
                    page.ListItem.File.Publish("News article");
                    ctx.ExecuteQuery();
                    ctx.Load(page.ListItem.File, obj => obj.ServerRelativeUrl);

                    //return page.ListItem;
                    date = date.AddDays(-1);
                    i++;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                
Console.ReadKey();

            }
        }
        /// <summary>
        /// Creates/returns News subsite obj.
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private static Web CreateOrGetNewsSite(ClientContext ctx)
        {
            try
            {
                Web web;
                var site = ctx.Site;
                ctx.Load(site);
                ctx.ExecuteQuery();

                var webs = site.RootWeb;
                ctx.Load(webs);
                ctx.ExecuteQuery();

                web = webs.CreateWeb(new OfficeDevPnP.Core.Entities.SiteEntity { Description = "News Site", Title = "News", Url = "News" }, true, true);

                //var webs = rootWeb.Webs;
                //ctx.Load(webs);
                //ctx.ExecuteQuery();

                //if (!webs.Any(r => r.Title == "News"))
                //{
                //    var webInfo = new WebCreationInformation { Description = "News Site", Title = "News", Url = "news" };
                //    web = webs.Add(webInfo);
                //    ctx.Load(web, w => w.Title);
                //    ctx.ExecuteQuery();
                //}
                //else
                //    web = webs.FirstOrDefault(r => r.Title == "News");
                return web;
            }
            catch (Exception)
            {
                throw;
            }
        }
        /// <summary>
        /// Adds items to the official entities list.
        /// </summary>
        private static void CreateMockDataForOfficialEntitiesList(ClientContext ctx, Microsoft.SharePoint.Client.Taxonomy.Term term, int index)
        {
            try
            {
                var web = ctx.Web;
                ctx.Load(web);
                ctx.ExecuteQuery();

                ctx.Load(web.Lists);
                ctx.ExecuteQuery();

                var list = web.Lists.GetByTitle("Official Entities");
                ctx.Load(list, l => l.Fields);
                ctx.ExecuteQuery();
                var itemCreateInfo = new ListItemCreationInformation();
                var newItem = list.AddItem(itemCreateInfo);

                if (index > m_Departments.Count() || index > m_Locations.Count() || index > m_Organizations.Count() || index > m_States.Count)
                    index = 0;

                newItem["Title"] = "Audience " + index.ToString();
                var termValue = new TaxonomyFieldValue { Label = term.Name, TermGuid = term.Id.ToString(), WssId = -1 };
                var txField = ctx.CastTo<TaxonomyField>(list.Fields.GetByInternalNameOrTitle("CNCMainAudience"));
                txField.SetFieldValueByValue(newItem, termValue);
                //newItem["CNCMainAudience"] = term;
                //newItem["CNCUPStates"] = m_States[index];
                //newItem["CNCUPOrganizations"] = m_Organizations[index];
                //newItem["CNCUPLocations"] = m_Locations[index];
                //newItem["CNCUPDepartments"] = m_Departments[index];
                newItem.Update();
             
               ctx.ExecuteQuery();
            }
            catch (Exception)
            {
            }
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
