<%@ Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePointPortalControls" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@ Register Tagprefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	<PublishingWebControls:EditModePanel runat="server">
		<!-- Styles for edit mode only-->
		<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	</PublishingWebControls:EditModePanel>
	<SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server"/>
    
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"> 
    <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigationSwitchableProvider" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=289 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/15/images/fgimg.png?rev=40" HideInteriorRootNodes="true" SkipLinkText="" /> 
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
    <div class="main-container background-off-white">
    <div class="container-fluid back-image"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 main-left-content">
                <section class="hero-news-container">
                    <div class="row page-controls">
                        <div class="col-12">
                        <div class="page-control-wrapper">
                        <div class="page-control-wrap">
                            <span class="share">
    							<a href="#">
    							  <span style="color:#908b63">Share<i class="fa fa-share-square-o" aria-hidden="true" style="margin-left:4px;"></i></span> 
    							</a>
    						</span>
                        </div>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>

						<script type="text/javascript">
							var subject = jQuery('.news-title-block .card-text').text();
							var body = 'I thought you would find this article interesting';
							var mailToLink = 'mailto:?subject={0}&body={1}:\r\n\r\n{2}';
							mailToLink = mailToLink.replace('{0}', subject).replace('{1}', body).replace('{2}', window.location.origin + window.location.pathname);
							jQuery('.share a').attr('href',mailToLink);
							jQuery('.share').css('display', 'block');
						</script>
                        <div class="page-control-wrap">
                            <bookmark-page></bookmark-page>
                        </div>
                    </div>
                    </div>
                    </div>
                    <PublishingWebControls:RichImageField FieldName="PublishingPageImage" runat="server" CssClass="img-fluid" />
                    <div class="card">
                        <div class="news-title-block">
                            <p class="card-date"><SharePointWebControls:FieldValue FieldName="COM_PublishDateFormat" runat="server"/></p>
                            <p class="card-text"><SharePointWebControls:TextField runat="server" FieldName="Title"/></p>
                        </div>
                    </div>
                    <div class="news-block"><SharePointWebControls:NoteField runat="server" FieldName="COM_NewsAbstract"/></div>
                    <div class="news-content">
                        <SharePointWebControls:FieldValue FieldName="PublishingPageContent" runat="server"/>
                        <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Edit" CssClass="edit-mode-panel title-edit">    
                        <PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" runat="server" id="RichHtmlField1"/>
                        </PublishingWebControls:EditModePanel> 
                    </div>
                    <div class="news-tag-content row">
                    <div class="col-md-3">
                        <news-page-likes></news-page-likes>
                    </div>
                        <div class="col-md-9">
                        <div class="tag-container pull-right">
                            <Taxonomy:TaxonomyFieldControl FieldName="COM_NewsType" InputFieldLabel="News Type" runat="server"></Taxonomy:TaxonomyFieldControl>
                            <Taxonomy:TaxonomyFieldControl FieldName="COM_Group" InputFieldLabel="Group" runat="server"></Taxonomy:TaxonomyFieldControl>
                            <Taxonomy:TaxonomyFieldControl FieldName="COM_Location" InputFieldLabel="Location" runat="server"></Taxonomy:TaxonomyFieldControl>
                        </div>
                        </div>
                    </div>
                    <div id="ci-embedded-feed" class="container" style="height:400px;width:100%;"></div>
                </section>
            </div><!--main-left-content-->
                <div class="col-lg-4 main-right-rail">
                    <WebPartPages:WebPartZone runat="server" Title="Right" ID="RightZone" /> 
                    <!--trending-news-webpart-->
                      <div><PublishingWebControls:ContentByQueryWebPart runat="server" ItemStyle="TrendingNews" GroupStyle="DefaultHeader" ListName="" FilterField1="{0b784073-3117-4340-8475-a63c087a464e}" Filter1ChainingOperator="Or" Filter2ChainingOperator="Or" FilterOperator1="Leq" FilterDisplayValue1="[Today]" FilterValue1="[Today]" FilterType1="DateTime" DataMappingViewFields="{94f89715-e097-4e8b-ba79-ea02aa8b7adb},Lookup;{b9e6f3ae-5632-4b13-b636-9d1a2bd67120},Computed;{543bc2cf-1f30-488e-8f25-6fe3b689d9ac},Image;{fa564e0f-0c70-4ab9-b863-0177e6ddd247},Text;{691b9a4b-512e-4341-b3f1-68914130d5b2},Text;{60677f2d-9b5c-4278-9352-87cfee8a28ca},TaxonomyFieldType;{a0107484-a768-4873-9942-e33f818a8701},TaxonomyFieldType;{f1f1f3f0-639f-4240-9e77-9164aa7ebdf4},TaxonomyFieldType;{0b784073-3117-4340-8475-a63c087a464e},DateTime;" GroupByDirection="Desc" SortBy="{0b784073-3117-4340-8475-a63c087a464e}" SortByFieldType="DateTime" SortByDirection="Desc" ItemLimit="3" DataMappings="NewsType:{60677f2d-9b5c-4278-9352-87cfee8a28ca},COM_NewsType,TaxonomyFieldType;|LinkUrl:{94f89715-e097-4e8b-ba79-ea02aa8b7adb},FileRef,Lookup;|Description:{691b9a4b-512e-4341-b3f1-68914130d5b2},ShortComment,Text;|YammerIDNumber:|AllDayEvent:|EventDate:|ImageUrl:{b9e6f3ae-5632-4b13-b636-9d1a2bd67120},EncodedAbsThumbnailUrl,Computed;{543bc2cf-1f30-488e-8f25-6fe3b689d9ac},PublishingRollupImage,Image;|Title:{fa564e0f-0c70-4ab9-b863-0177e6ddd247},Title,Text;|EventType:|Group:{f1f1f3f0-639f-4240-9e77-9164aa7ebdf4},COM_Group,TaxonomyFieldType;|PublishDate:{0b784073-3117-4340-8475-a63c087a464e},COM_PublishDate,DateTime;|Location:{a0107484-a768-4873-9942-e33f818a8701},COM_Location,TaxonomyFieldType;|NewsAbstract:{efb26898-314c-427b-afda-96c0b69b74dd},COM_NewsAbstract,Text;|EndTime:|EventDateAllDay:|" FilterByAudience="True" MainXslLink="/sites/stage/Style Library/XSL Style Sheets/COM_ContentQueryMain.xsl" HeaderXslLink="/sites/stage/Style Library/XSL Style Sheets/COM_Header.xsl" ItemXslLink="/sites/stage/Style Library/XSL Style Sheets/COM_ItemStyle.xsl" EnableOriginalValue="False" ViewFlag="0" ViewContentTypeId="" ListUrl="" ListDisplayName="" ListId="00000000-0000-0000-0000-000000000000" PageSize="-1" UseSQLDataSourcePaging="True" DataSourceID="" ShowWithSampleData="False" AsyncRefresh="False" ManualRefresh="False" AutoRefresh="False" AutoRefreshInterval="60" InitialAsyncDataFetch="False" Title="Trending News" FrameType="TitleBarOnly" SuppressWebPartChrome="False" Description="Displays a dynamic view of content from your site." IsIncluded="True" ZoneID="" PartOrder="0" FrameState="Normal" AllowRemove="True" AllowZoneChange="True" AllowMinimize="True" AllowConnect="True" AllowEdit="True" AllowHide="True" IsVisible="True" DetailLink="" HelpLink="" HelpMode="Modeless" Dir="Default" PartImageSmall="" MissingAssembly="Cannot import this Web Part." PartImageLarge="" IsIncludedFilter="" ExportControlledProperties="True" ConnectionID="00000000-0000-0000-0000-000000000000" ID="g_47e8e7bc_158d_4b4b_9456_9b274659e30e" ChromeType="TitleOnly" ExportMode="All" __MarkupType="vsattributemarkup" __WebPartId="{47e8e7bc-158d-4b4b-9456-9b274659e30e}" WebPart="true" Height="" Width=""><Xsl><xsl:stylesheet version="1.0" exclude-result-prefixes="xsl cmswrt x"><xsl:import href="/Style Library/XSL Style Sheets/COM_Header.xsl" /><xsl:import href="/Style Library/XSL Style Sheets/COM_ItemStyle.xsl" /><xsl:import href="/Style Library/XSL Style Sheets/COM_ContentQueryMain.xsl" /></xsl:stylesheet></Xsl><SampleData><dsQueryResponse><Rows><Row Title="Item 1" LinkUrl="http://Item1" Group="Group Header" __begincolumn="True" __begingroup="True" /><Row Title="Item 2" LinkUrl="http://Item2" __begincolumn="False" __begingroup="False" /><Row Title="Item 3" LinkUrl="http://Item3" __begincolumn="False" __begingroup="False" /></Rows></dsQueryResponse></SampleData><DataFields /><ParameterBindings /></PublishingWebControls:ContentByQueryWebPart></div>
                    <!--related-news-webpart-->   
                    <div>
                        <related-news></related-news>

                    </div>                                     
                </div> <!--main-right-rail-->
            </div>
        </div> <!--/.container-->
    </div><!--main-container-->    
    <script type="text/javascript" src="https://c64.assets-yammer.com/assets/platform_embed.js"></script>
    <script>
        yam.connect.embedFeed({
            container: '#ci-embedded-feed',
            network: 'compassion.com',
            feedType: 'open-graph',
            config: {
                defaultGroupId: 12687321,
                showOpenGraphPreview: false,
                promptText: 'Comment on this article',
                header: false,
                footer: false
            }
        });
    </script>
    <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Edit" CssClass="edit-mode-panel title-edit">
        <SharePointWebControls:DateTimeField runat="server" FieldName="COM_ExpirationDate"/>
        <SharePointWebControls:NumberField runat="server" FieldName="COM_SortOrder"/>
        <SharePointWebControls:DateTimeField FieldName="COM_PublishDate" runat="server" id="ArticleDate" />
        <SharePointWebControls:TextField runat="server" FieldName="COM_YammerID"/>
    </PublishingWebControls:EditModePanel> 
    <span id="article-news-type" class="ng-hide">
        <SharePointWebControls:FieldValue FieldName="COM_NewsType" runat="server"/>
    </span>
</asp:Content>
