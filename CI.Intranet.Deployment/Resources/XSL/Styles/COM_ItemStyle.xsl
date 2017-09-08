<xsl:stylesheet
  version="1.0"
  exclude-result-prefixes="x d xsl msxsl cmswrt"
  xmlns:x="http://www.w3.org/2001/XMLSchema"
  xmlns:d="http://schemas.microsoft.com/sharepoint/dsp"
  xmlns:cmswrt="http://schemas.microsoft.com/WebParts/v3/Publishing/runtime"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime">


  <xsl:param name="ItemsHaveStreams">
    <xsl:value-of select="'False'" />
  </xsl:param>
  <xsl:variable name="OnClickTargetAttribute" select="string('javascript:this.target=&quot;_blank&quot;')" />
  <xsl:variable name="ImageWidth" />
  <xsl:variable name="ImageHeight" />
  <xsl:template name="Default" match="*" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-left">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="NoImage" match="Row[@Style='NoImage']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item link-item">
      <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
      <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
        <xsl:if test="$ItemsHaveStreams = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of select="@OnClickForWebRendering"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="$DisplayTitle"/>
      </a>
      <div class="description">
        <xsl:value-of select="@Description" />
      </div>
    </div>
  </xsl:template>
  <xsl:template name="TitleOnly" match="Row[@Style='TitleOnly']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item link-item">
      <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
      <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
        <xsl:if test="$ItemsHaveStreams = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of select="@OnClickForWebRendering"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="$DisplayTitle"/>
      </a>
    </div>
  </xsl:template>
  <xsl:template name="TitleWithBackground" match="Row[@Style='TitleWithBackground']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="title-With-Background">
      <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
      <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
        <xsl:if test="$ItemsHaveStreams = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of select="@OnClickForWebRendering"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="$DisplayTitle"/>
      </a>
    </div>
  </xsl:template>
  <xsl:template name="Bullets" match="Row[@Style='Bullets']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item link-item bullet">
      <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
      <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
        <xsl:if test="$ItemsHaveStreams = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of select="@OnClickForWebRendering"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
          <xsl:attribute name="onclick">
            <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="$DisplayTitle"/>
      </a>
    </div>
  </xsl:template>
  <xsl:template name="ImageRight" match="Row[@Style='ImageRight']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-right">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="ImageTop" match="Row[@Style='ImageTop']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="Url" select="@LinkUrl"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-top">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="ImageTopCentered" match="Row[@Style='ImageTopCentered']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item centered">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-top">
          <a href="{$SafeLinkUrl}" >
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="LargeTitle" match="Row[@Style='LargeTitle']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-left">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
      <div class="link-item-large">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="ClickableImage" match="Row[@Style='ClickableImage']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-left">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
              <xsl:if test="$ImageWidth != ''">
                <xsl:attribute name="width">
                  <xsl:value-of select="$ImageWidth" />
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="$ImageHeight != ''">
                <xsl:attribute name="height">
                  <xsl:value-of select="$ImageHeight" />
                </xsl:attribute>
              </xsl:if>
            </img>
          </a>
        </div>
      </xsl:if>
    </div>
  </xsl:template>
  <xsl:template name="NotClickableImage" match="Row[@Style='NotClickableImage']" mode="itemstyle">
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-left">
          <img class="image" src="{$SafeImageUrl}" title="{@ImageUrlAltText}">
            <xsl:if test="$ImageWidth != ''">
              <xsl:attribute name="width">
                <xsl:value-of select="$ImageWidth" />
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ImageHeight != ''">
              <xsl:attribute name="height">
                <xsl:value-of select="$ImageHeight" />
              </xsl:attribute>
            </xsl:if>
          </img>
        </div>
      </xsl:if>
    </div>
  </xsl:template>
  <xsl:template name="FixedImageSize" match="Row[@Style='FixedImageSize']" mode="itemstyle">
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item">
      <xsl:if test="string-length($SafeImageUrl) != 0">
        <div class="image-area-left">
          <a href="{$SafeLinkUrl}">
            <xsl:if test="$ItemsHaveStreams = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of select="@OnClickForWebRendering"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
              <xsl:attribute name="onclick">
                <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
              </xsl:attribute>
            </xsl:if>
            <img class="image-fixed-width" src="{$SafeImageUrl}" title="{@ImageUrlAltText}"/>
          </a>
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="WithDocIcon" match="Row[@Style='WithDocIcon']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="''"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
        <xsl:with-param name="UseFileName" select="1"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="item link-item">
      <xsl:if test="string-length(@DocumentIconImageUrl) != 0">
        <div class="image-area-left">
          <img class="image" src="{@DocumentIconImageUrl}" title="" />
        </div>
      </xsl:if>
      <div class="link-item">
        <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}">
          <xsl:if test="$ItemsHaveStreams = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of select="@OnClickForWebRendering"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$ItemsHaveStreams != 'True' and @OpenInNewWindow = 'True'">
            <xsl:attribute name="onclick">
              <xsl:value-of disable-output-escaping="yes" select="$OnClickTargetAttribute"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:value-of select="$DisplayTitle"/>
        </a>
        <div class="description">
          <xsl:value-of select="@Description" />
        </div>
      </div>
    </div>
  </xsl:template>
  <xsl:template name="HiddenSlots" match="Row[@Style='HiddenSlots']" mode="itemstyle">
    <div class="SipAddress">
      <xsl:value-of select="@SipAddress" />
    </div>
    <div class="LinkToolTip">
      <xsl:value-of select="@LinkToolTip" />
    </div>
    <div class="OpenInNewWindow">
      <xsl:value-of select="@OpenInNewWindow" />
    </div>
    <div class="OnClickForWebRendering">
      <xsl:value-of select="@OnClickForWebRendering" />
    </div>
  </xsl:template>

  <!-- Start of Custom Item Styles -->

  <!-- Featured News -->
  <xsl:template name="FeaturedNews" match="Row[@Style='FeaturedNews']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    
     <xsl:variable name="YammerID">
      <xsl:value-of select="@YammerIDNumber" />
    </xsl:variable>
    
    <!-- <div class="row news-card-container">
    <div class="col-md-6 news-card-wrapper"> 
    FIRST HERO AREA--> 
    <div class="">
    <div class="">  
      <div class="hero-news-container">
      <div class="card-group">
        
          <div class="card img-card">
            <xsl:if test="string-length($SafeImageUrl) != 0">
              <a href="{$SafeLinkUrl}" >
                <image-loader image-css-class="img-fluid" image-src="{$SafeImageUrl}" image-alt-text="{@ImageUrlAltText}"/>
              </a>
            </xsl:if>
          </div>
<div class="card">
<div class="card-body">
        <h4 class="card-title">
          <xsl:if test="string-length(@NewsType) != 0">
            <a>
              <xsl:attribute name="href">
                /news/pages/news.aspx?newstype=<xsl:value-of select="@NewsType" />
              </xsl:attribute>
              <xsl:value-of select="@NewsType"/>
            </a>
          </xsl:if>
          </h4>
          <h4 class="card-title">
          <xsl:if test="string-length(@Location) != 0">
            <a>
              <xsl:attribute name="href">
                /news/pages/news.aspx?location=<xsl:value-of select="@Location" />
              </xsl:attribute>
              <xsl:value-of select="@Location"/>
            </a>
          </xsl:if>
          </h4>
          <h4 class="card-title">
          <xsl:if test="string-length(@Group) != 0">
            <a>
              <xsl:attribute name="href">
                /news/pages/news.aspx?group=<xsl:value-of select="@Group" />
              </xsl:attribute>
              <xsl:value-of select="@Group"/>
            </a>
          </xsl:if>
        </h4>
            <div class="card-date">
        <xsl:value-of select="ddwrt:FormatDateTime(string(@PublishDate),1033,'MMMM d, yyyy')" disable-output-escaping="yes"/>
            </div>
            <div class="card-text">
              <a href="{$SafeLinkUrl}" title="{@LinkToolTip}" class="title">
                <xsl:value-of select="$DisplayTitle"/>
              </a>
            </div>
                 <xsl:value-of select="$YammerID"/>
                 <news-page-likes page-url="{$SafeLinkUrl}"></news-page-likes>
          </div>
          </div>
          </div>
        </div>
      </div>
     </div>
  </xsl:template>



 <!-- Recent News -->
  <xsl:template name="RecentNews" match="Row[@Style='RecentNews']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
     <xsl:variable name="YammerID">
      <xsl:value-of select="@YammerIDNumber" />
    </xsl:variable>

    <!-- <div class= "hero-news-container">
    <div class="row news-card-container">
    <div class="col-md-6 news-card-wrapper">  
      <div class="row">-->
      <div class="recent-news-wrapper">
      <div class="card">
          <xsl:if test="string-length($SafeImageUrl) != 0">
              <a href="{$SafeLinkUrl}" class="">
                <image-loader image-src="{$SafeImageUrl}" image-alt-text="{@ImageUrlAltText}" image-css-class="card-img-top "></image-loader>
              </a>
          </xsl:if>

          <div class="card-body">
            <h4 class="card-title">
              <xsl:if test="string-length(@NewsType) != 0">
                <a>
                  <xsl:attribute name="href">
                    /news/pages/news.aspx?newstype=<xsl:value-of select="@NewsType" />
                  </xsl:attribute>
                  <xsl:value-of select="@NewsType"/>
                </a>
              </xsl:if>
            </h4>
            <h4 class="card-title">
              <xsl:if test="string-length(@Location) != 0">
                <a>
                  <xsl:attribute name="href">
                    /news/pages/news.aspx?location=<xsl:value-of select="@Location" />
                  </xsl:attribute>
                  <xsl:value-of select="@Location"/>
                </a>
              </xsl:if>
            </h4>
            <h4 class="card-title">
              <xsl:if test="string-length(@Group) != 0">
                <a>
                  <xsl:attribute name="href">
                    /news/pages/news.aspx?group=<xsl:value-of select="@Group" />
                  </xsl:attribute>
                  <xsl:value-of select="@Group"/>
                </a>
              </xsl:if>
            </h4>
            <div class="card-date">
        <xsl:value-of select="ddwrt:FormatDateTime(string(@PublishDate),1033,'MMMM d, yyyy')" disable-output-escaping="yes"/>
            </div>
            <div class="card-text">
              <a href="{$SafeLinkUrl}" title="{@LinkToolTip}" class="title">
                <xsl:value-of select="$DisplayTitle"/>
              </a>
            </div>
                 <xsl:value-of select="$YammerID"/>
            <news-page-likes page-url="{$SafeLinkUrl}"></news-page-likes>

          </div>
         </div>
        </div>
    <xsl:if test="count(preceding-sibling::*)=0">
      <a class="btn btn-cta" href="/sites/stage/news">View All News</a>
    </xsl:if>
  </xsl:template>



  <!-- Trending News -->
  <xsl:template name="TrendingNews" match="Row[@Style='TrendingNews']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="SafeImageUrl">
      <xsl:call-template name="OuterTemplate.GetSafeStaticUrl">
        <xsl:with-param name="UrlColumnName" select="'ImageUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="card trending">
      <div class="card-body">
        <p class="card-date">
        <xsl:value-of select="ddwrt:FormatDateTime(string(@PublishDate),1033,'MMMM d, yyyy')" disable-output-escaping="yes"/>
        </p>
        <a href="{$SafeLinkUrl}" title="{@LinkToolTip}" class="title">
          <p class="card-text">
            <xsl:value-of select="$DisplayTitle"/>
          </p>
        </a>
        <news-page-likes page-url="{$SafeLinkUrl}"></news-page-likes>
      </div>
    </div>
    <xsl:if test="count(following-sibling::*)=0">
      <a class="btn btn-cta" href="/sites/stage/news">View All News</a>
    </xsl:if>
  </xsl:template>


  <!-- Events -->
  <xsl:template name="Events" match="Row[@Style='Events']" mode="itemstyle">
    <xsl:variable name="SafeLinkUrl">
      <xsl:call-template name="OuterTemplate.GetSafeLink">
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="DisplayTitle">
      <xsl:call-template name="OuterTemplate.GetTitle">
        <xsl:with-param name="Title" select="@Title"/>
        <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="LinkTarget">
      <xsl:if test="@OpenInNewWindow = 'True'" >_blank</xsl:if>
    </xsl:variable>

    <xsl:if test="@EventDateAllDay!=''"/>
    <!--do nothing..just show the var in the web part properties -->
    <xsl:variable name="AdjustedEventDate">
      <xsl:choose>
        <xsl:when test="@AllDayEvent=1">
          <!--this is an all day event so use the calc column -->
          <xsl:value-of select="@EventDateAllDay" />
        </xsl:when>
        <xsl:otherwise>
          <!-- use the reg date -->
          <xsl:value-of select="@EventDate" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!--start time details-->
    <xsl:variable name="dateTime" select="ddwrt:FormatDate(string($AdjustedEventDate), 1033, 3)"/>
    <xsl:variable name="dateTimeCondensed" select="ddwrt:FormatDate(string($AdjustedEventDate), 1033, 2)"/>
    <xsl:variable name="date"  select="substring-before(substring-after($dateTime, ', '), ', ')" />
    <xsl:variable name="month" select="substring-before($date, ' ')" />
    <xsl:variable name="monthAbbr" select="substring($month,0,4)"/>
    <xsl:variable name="day"   select="substring-after($date, ' ')" />
    <xsl:variable name="time"  select="substring-after($dateTimeCondensed, ' ')" />

    <!--end time details-->
    <xsl:variable name="enddateTimeCondensed" select="ddwrt:FormatDate(string(@EndTime), 1033, 2)"/>
    <xsl:variable name="endtime"  select="substring-after($enddateTimeCondensed, ' ')" />

    <!-- <div class="row news-card-container">
    <div class="col-md-6 news-card-wrapper"> -->
    <div class="">
    <div class="">
    <div class="card upcoming-events">    

    <div class="card-body">
      <a class="card-text" onclick="ShowPopupDialog(GetGotoLinkUrl(this));return false;" href="{$SafeLinkUrl}" >
        <xsl:value-of select="@Title" />
      </a>
      
      <div class="card-date">
       <span class="event-month">
         <xsl:value-of select="ddwrt:FormatDateTime(string(@EventDate),1033,'MMMM d, yyyy')" disable-output-escaping="yes"/>
       </span>
       <!--<span class="event-day">
        <xsl:value-of select="$day"/>
       </span>-->
      </div>
    

      <xsl:if test="string-length($time) != 0">
        <p class="card-time">
          <xsl:value-of select="$time" />
          <xsl:if test="string-length($endtime) != 0">
            &#160;-&#160;<xsl:value-of select="$endtime" />
          </xsl:if>
        </p>
      </xsl:if>
      
      <p class="card-location">
        <xsl:value-of select="@Location"/>
      </p>

      <h4 class="card-title">
        <xsl:if test="string-length(@EventType) != 0">
          <a>
            <xsl:attribute name="href">
              /news/pages/news.aspx?newstype=<xsl:value-of select="@EventType" />
            </xsl:attribute>
            <xsl:value-of select="@EventType"/>
          </a>
        </xsl:if>
      </h4>
      <h4 class="card-title">
        <xsl:if test="string-length(@LocationTag) != 0">
          <a>
            <xsl:attribute name="href">
              /news/pages/news.aspx?location=<xsl:value-of select="@LocationTag" />
            </xsl:attribute>
            <xsl:value-of select="@LocationTag"/>
          </a>
        </xsl:if>
      </h4>
      <h4 class="card-title">
        <xsl:if test="string-length(@Group) != 0">
          <a>
            <xsl:attribute name="href">
              /news/pages/news.aspx?group=<xsl:value-of select="@Group" />
            </xsl:attribute>
            <xsl:value-of select="@Group"/>
          </a>
        </xsl:if>
      </h4>
    </div>
    </div>    
    </div>
    </div>
    <xsl:if test="count(following-sibling::*)=0">
      <a class="btn btn-cta" href="/sites/stage/news">View All Events</a>
    </xsl:if>
  </xsl:template>


  <!-- End of Custom Styles -->

</xsl:stylesheet>
