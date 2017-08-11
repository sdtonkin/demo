﻿<%@ Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
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
                    <PublishingWebControls:RichImageField FieldName="PublishingPageImage" runat="server" CssClass="img-fluid" />
                    <div class="card">
                        <div class="news-title-block">
                            <p class="card-date"><SharePointWebControls:DateTimeField FieldName="COM_PublishDate" runat="server" id="ArticleDate" /></p>
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
                            <span class="card-likes"><i class="fa fa-heart-o"></i>26</span>
                        </div>
                            <div class="col-md-6">
                            <div class="tag-container pull-right">
                                <h4 class="card-tags">Global Events</h4>
                                <h4 class="card-tags">Global Events</h4>
                                <h4 class="card-tags">Global Events</h4>
                            </div>
                            </div>
                        </div>
                </section>
            </div><!--main-left-content-->
                <div class="col-lg-4 main-right-rail">
                    <WebPartPages:WebPartZone runat="server" Title="Right" ID="RightZone" />                   
                </div> <!--main-right-rail-->
            </div>
        </div> <!--/.container-->
    </div><!--main-container-->
    <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Edit" CssClass="edit-mode-panel title-edit">
        <SharePointWebControls:DateTimeField runat="server" FieldName="COM_ExpirationDate"/>
        <SharePointWebControls:NumberField runat="server" FieldName="COM_SortOrder"/>
        <Taxonomy:TaxonomyFieldControl FieldName="COM_NewsType" InputFieldLabel="News Type" runat="server"></Taxonomy:TaxonomyFieldControl>
        <Taxonomy:TaxonomyFieldControl FieldName="COM_Group" InputFieldLabel="Group" runat="server"></Taxonomy:TaxonomyFieldControl>
        <Taxonomy:TaxonomyFieldControl FieldName="COM_Location" InputFieldLabel="Location" runat="server"></Taxonomy:TaxonomyFieldControl>
        <SharePointWebControls:TextField runat="server" FieldName="COM_YammerID"/>
    </PublishingWebControls:EditModePanel>    
</asp:Content>