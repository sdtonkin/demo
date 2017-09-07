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
        <div class="container">
            <div class="row">
                <div class="col-lg-8 main-left-content">
                <section class="hero-news-container">
                    <div>
                        <bookmark-page></bookmark-page>
                    </div>
                    <PublishingWebControls:RichImageField FieldName="PublishingPageImage" runat="server" CssClass="img-fluid" />
                    <div class="card">
                        <div class="news-title-block">
                            <p class="card-date"><SharePointWebControls:FieldValue FieldName="COM_DateFormat" runat="server"/></p>
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
                    <div class="col-md-6">
                        <news-page-likes></news-page-likes>
                    </div>
                        <div class="col-md-6">
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
                     <PublishingWebControls:ContentByQueryWebPart runat="server" ItemStyle="TrendingNews" GroupStyle="DefaultHeader" SortBy="{0b784073-3117-4340-8475-a63c087a464e}" SortByDirection="Desc" 
                            DataMappings="NewsType:{60677f2d-9b5c-4278-9352-87cfee8a28ca},COM_NewsType,TaxonomyFieldType;|LinkUrl:{94f89715-e097-4e8b-ba79-ea02aa8b7adb},FileRef,Lookup;|Description:{691b9a4b-512e-4341-b3f1-68914130d5b2},ShortComment,Text;|YammerIDNumber:|AllDayEvent:|EventDate:|ImageUrl:{b9e6f3ae-5632-4b13-b636-9d1a2bd67120},EncodedAbsThumbnailUrl,Computed;{543bc2cf-1f30-488e-8f25-6fe3b689d9ac},PublishingRollupImage,Image;|Title:{fa564e0f-0c70-4ab9-b863-0177e6ddd247},Title,Text;|EventType:|Group:{f1f1f3f0-639f-4240-9e77-9164aa7ebdf4},COM_Group,TaxonomyFieldType;|PublishDate:{0b784073-3117-4340-8475-a63c087a464e},COM_PublishDate,DateTime;|Location:{a0107484-a768-4873-9942-e33f818a8701},COM_Location,TaxonomyFieldType;|NewsAbstract:{efb26898-314c-427b-afda-96c0b69b74dd},COM_NewsAbstract,Text;|EndTime:|EventDateAllDay:|" 
                            ServerTemplate="850" EnableOriginalValue="False" ViewFlag="0" ViewContentTypeId="" ListUrl="" ListDisplayName="" ListId="00000000-0000-0000-0000-000000000000" PageSize="-1" UseSQLDataSourcePaging="True" DataSourceID="" ShowWithSampleData="False" AsyncRefresh="False" ManualRefresh="False" AutoRefresh="False" AutoRefreshInterval="60" NoDefaultStyle="" InitialAsyncDataFetch="False" Title="Trending News" FrameType="TitleBarOnly" SuppressWebPartChrome="False" Description="$Resources:cmscore,ContentQueryWebPart_Description" IsIncluded="True" ZoneID="" PartOrder="1" FrameState="Normal" AllowRemove="Fales" AllowZoneChange="False" AllowMinimize="False" AllowConnect="False" AllowEdit="False" AllowHide="False" IsVisible="True" DetailLink="" HelpLink="" HelpMode="Modeless" Dir="Default" PartImageSmall="" MissingAssembly="$Resources:cmscore,WebPartImportError" ImportErrorMessage="$Resources:cmscore,WebPartImportError" PartImageLarge="" IsIncludedFilter="" ExportControlledProperties="True" ConnectionID="00000000-0000-0000-0000-000000000000" ID="ContentByQueryWebPart1" ChromeType="TitleOnly" ExportMode="All" __MarkupType="vsattributemarkup" __WebPartId="{0eebbafa-56d2-4ee0-a0dc-6661adc97402}" WebPart="true" Height="" Width=""><Xsl>
                            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cmswrt="http://schemas.microsoft.com/WebPart/v3/Publishing/runtime" exclude-result-prefixes="xsl cmswrt x" > <xsl:import href="/Style Library/XSL Style Sheets/Header.xsl" /> <xsl:import href="/Style Library/XSL Style Sheets/ItemStyle.xsl" /> <xsl:import href="/Style Library/XSL Style Sheets/ContentQueryMain.xsl" /> </xsl:stylesheet></Xsl>
                            <SampleData>
                            <dsQueryResponse>
                                                <Rows>
                                                    <Row Title="Item 1" LinkUrl="http://Item1" Group="Group Header" __begincolumn="True" __begingroup="True" />
                                                    <Row Title="Item 2" LinkUrl="http://Item2" __begincolumn="False" __begingroup="False" />
                                                    <Row Title="Item 3" LinkUrl="http://Item3" __begincolumn="False" __begingroup="False" />
                                                </Rows>
                                                </dsQueryResponse></SampleData>
                            <DataFields>
                            </DataFields>
                    </PublishingWebControls:ContentByQueryWebPart>
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
</asp:Content>
