using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.File.Stream.RNReactNativeFileStream
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeFileStreamModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeFileStreamModule"/>.
        /// </summary>
        internal RNReactNativeFileStreamModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeFileStream";
            }
        }
    }
}
