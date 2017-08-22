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
    <div class="container">
        <div class="row">
        <!-- Webpart Zone - Top Left -->
	        <div class="mb-wp-zone container-half topleft col-sm-8 main-left-content">
		        <WebPartPages:WebPartZone runat="server" Title="Top Left" ID="TopLeftZone" />
	        </div>

            <!-- Webpart Zone - Right -->
	        <div class="mb-wp-zone container-half right col-sm-4 main-right-rail">
		        <WebPartPages:WebPartZone runat="server" Title="Right" ID="RightZone" />
	        </div>
            <!-- Webpart Zone - Bottom Left -->
	        
        </div>
        <div class="row">
            <div class="mb-wp-zone container-half bottom-left col-sm-8">
		        <WebPartPages:WebPartZone runat="server" Title="Bottom Left" ID="BottomLeftZone" />
	        </div>
        </div>
    </div>
    <!-- Webpart Zone - Top -->

        <div class="mb-wp-zone container-full top">
	        <WebPartPages:WebPartZone runat="server" Title="Top" ID="TopZone" />
        </div>

    <!-- Webpart Zone - Bottom -->
    
        <div class="mb-wp-zone container-half bottom">
	        <WebPartPages:WebPartZone runat="server" Title="Bottom" ID="BottomZone" />
        </div>
    
    <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Edit" CssClass="edit-mode-panel title-edit">    
    </PublishingWebControls:EditModePanel>    
</asp:Content>
