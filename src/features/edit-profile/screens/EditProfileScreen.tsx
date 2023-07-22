import { View, Text } from "native-base";
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { getCurrentUser, getUser, signUp } from "../../../api/user";
import tw from "twrnc";
import { AppBanner } from "../../../components/util/AppBanner";
import SignUpForm from "../../../components/forms/SignUpForm";
import React from "react";
import { Platform } from "react-native";
import { EditProfileForm } from "../../../components/forms/EditProfileForm";
import { useSignUp } from "../../sign-up/hooks/use-sign-up";

export const EditProfileScreen = () => {

  const user = getCurrentUser();
  const isWeb = Platform.OS === 'web';
  const textSize = isWeb ? 'text-5xl' : 'text-3xl';
  const textSizeSub = isWeb ? 'text-4xl' : 'text-2xl';
  const textCenter = isWeb ? '' : 'text-center';

  const [signUp, { isLoading, error }] = useSignUp();


  return (
      <GuestLayout>
        { isWeb ? (
            <View style={ tw`flex-row items-center justify-around w-full h-full mt-5 px-10 ` }>
              <View style={ { flex: 1 } }>
                <Text style={ tw`${ textCenter } font-bold mb-3 ${ textSize }` }>{ user?.displayName }</Text>
                <Text
                    style={ tw`${ textCenter } font-medium text-gray-500 mb-10 ${ textSizeSub }` }>{ user?.email }</Text>
              </View>
              <View style={ { flex: 1 } }>
                <EditProfileForm onSubmit={ signUp } isLoading={ isLoading } buttonText={ 'Edit profile' }/>
              </View>
            </View>
        ) : (
            <View>
              <AppBanner/>
            </View>
        ) }
      </GuestLayout>
  );
}