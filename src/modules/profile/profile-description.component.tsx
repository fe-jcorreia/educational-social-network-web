import React from "react";

import { User } from "@src/model";
import { ProfileDescriptionEdit } from "./profile-description-edit.component";
import { ProfileDescriptionStatic } from "./profile-description-static.component";

interface ProfileDescriptionProps {
  user: User;
}

export const ProfileDescription = (props: ProfileDescriptionProps) => {
  const [editProfile, setEditProfile] = React.useState(false);
  const [profile, setProfile] = React.useState<User>(props.user);

  return (
    <>
      {!editProfile ? (
        <ProfileDescriptionStatic profile={profile} onEdit={setEditProfile} />
      ) : (
        <ProfileDescriptionEdit
          profile={profile}
          editProfile={setProfile}
          onEdit={setEditProfile}
        />
      )}
    </>
  );
};
