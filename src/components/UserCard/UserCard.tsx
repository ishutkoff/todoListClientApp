import { classNames } from "@/utils/className";
import cls from "./UserCard.module.scss";
import * as md5 from "md5";
import jwt_decode from "jwt-decode";
import { useState, useEffect, memo } from "react";

interface UserCardProps {
  className?: string;
}
export const UserCard = memo((props: UserCardProps) => {
  const { className } = props;

  const [userData, setUserData] = useState<{
    userName: string;
    email: string;
  } | null>(null);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setUserData(jwt_decode(jwt));
    }
  }, []);

  return (
    <>
      {userData && (
        <div
          className={classNames(cls.userCard, {}, [className ? className : ""])}
        >
          <div className={cls.avatar}>
            <img
              src={`https://www.gravatar.com/avatar/${md5(
                userData.email
              )}?d=mp`}
            />
          </div>
          <div className={cls.userName}>{userData.userName}</div>
        </div>
      )}
    </>
  );
});
