﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CI.Intranet.Deployment.Properties {
    
    
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Editors.SettingsDesigner.SettingsSingleFileGenerator", "14.0.0.0")]
    internal sealed partial class Settings : global::System.Configuration.ApplicationSettingsBase {
        
        private static Settings defaultInstance = ((Settings)(global::System.Configuration.ApplicationSettingsBase.Synchronized(new Settings())));
        
        public static Settings Default {
            get {
                return defaultInstance;
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute(@"<?xml version=""1.0"" encoding=""utf-16""?>
<ArrayOfString xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <string>https://compassion.sharepoint.com/sites/stage-cfo</string>
  <string>https://compassion.sharepoint.com/sites/stage-gco</string>
  <string>https://compassion.sharepoint.com/sites/stage-glo</string>
  <string>https://compassion.sharepoint.com/sites/stage-gme</string>
  <string>https://compassion.sharepoint.com/sites/stage-gp</string>
  <string>https://compassion.sharepoint.com/sites/stage-hr</string>
  <string>https://compassion.sharepoint.com/sites/stage-innovation</string>
</ArrayOfString>")]
        public global::System.Collections.Specialized.StringCollection GroupSites {
            get {
                return ((global::System.Collections.Specialized.StringCollection)(this["GroupSites"]));
            }
        }
    }
}
