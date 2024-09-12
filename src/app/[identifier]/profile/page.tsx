"use client";

export default function UserProfilePage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    console.log(identifier);

}