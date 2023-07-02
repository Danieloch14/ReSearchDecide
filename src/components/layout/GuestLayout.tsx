import { View } from "native-base";
import tw from "twrnc";
import { FC } from "react";

type GuestLayoutProps = {
  children: React.ReactNode
}

export const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  return (
      <View
          style={ tw.style('py-7 px-12') }
      >
        { children }
      </View>
  )
}