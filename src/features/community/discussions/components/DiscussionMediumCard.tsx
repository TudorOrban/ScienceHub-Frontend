"use client"

import UserAvatar from "@/core/user/components/UserAvatar";
import { DiscussionSearchDTO } from "../models/Discussion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsis, faEye, faInfoCircle, faPaperPlane, faQuestion, faShare, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";
import Link from "next/link";
import { UIItem } from "@/shared/common/models/UITypes";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/shadcn-ui/components/ui/popover";

export interface DiscussionMediumCardProps {
    discussion: DiscussionSearchDTO;
}

const DiscussionMediumCard = ({
    discussion,
}: DiscussionMediumCardProps) => {
    const router = useRouter();

    const discussionUrl = constructFeatureURL(Feature.Discussion, discussion.title.toString());

    const handleAvatarClick = () => {
        const userProfileUrl = constructFeatureURL(Feature.UserProfile, discussion.user?.username ?? "");
        router.push(userProfileUrl);
    }

    const handleUpvoteClick = () => {
        console.log("Upvote clicked");
    }

    const handleShareClick = () => {
        console.log("Share clicked");
    }

    const handleViewClick = () => {
        console.log("View clicked");
    }

    const handleCommentClick = () => {
        console.log("Comment clicked");
    }

    const items: UIItem[] = [
        { icon: faUpLong, label: "", value: (discussion?.totalUpvotes ?? 0).toString(), onClick: handleUpvoteClick },
        { icon: faShare, label: "", value: (discussion?.totalShares ?? 0).toString(), onClick: handleShareClick },
        { icon: faEye, label: "", value: (discussion?.totalViews ?? 0).toString(), onClick: handleViewClick },
        { icon: faComment, label: "", value: (discussion?.totalComments ?? 0).toString(), onClick: handleCommentClick },
    ];

    const getPortalDiv = () => {
        let portalDiv = document.getElementById('portal-root');
        if (!portalDiv) {
            portalDiv = document.createElement('div');
            portalDiv.id = 'portal-root';
            document.body.appendChild(portalDiv);
        }
        return portalDiv;
    };

    useEffect(() => {
        return () => {
            const portalDiv = document.getElementById('portal-root');
            if (portalDiv && portalDiv.childNodes.length === 0) {
                portalDiv.parentNode?.removeChild(portalDiv);
            }
        };
    }, []);
    return (
        <div className="w-full relative space-y-4 pt-4 border border-gray-300 rounded-md shadow-md text-base">
            <div className="flex items-start justify-between px-4">
                <div className="flex items-center space-x-4">
                    <UserAvatar userSmall={discussion.user} onClick={() => handleAvatarClick()}/>

                    <Link href={discussionUrl}>
                        <span className="label-large pseudo-link">{discussion.title}</span>
                    </Link>
                </div>

                <Popover>
                    <PopoverTrigger>
                        <button className="standard-button">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="mr-12 w-40 bg-white border border-gray-300 rounded-md shadow-md">
                        <div className="flex flex-col items-start space-y-4">
                            <button className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faPaperPlane} className="small-icon"/>
                                <span className="text-base font-semibold">Report</span>
                            </button>
                            <button className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faInfoCircle} className="small-icon"/>
                                <span className="text-base font-semibold">Info</span>
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="px-4">
                <p className="text-lg">{discussion.content}</p>
            </div>

            <div className="flex divide-x divide-gray-200 border-t border-gray-300">
                {items.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={item?.onClick ?? (() => {})}
                        className="flex-1 flex items-center justify-center py-4 space-x-2"
                    >
                        <FontAwesomeIcon icon={item.icon ?? faQuestion} className="small-icon" />
                        <span className="text-xl font-medium">{item.value ?? 0}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DiscussionMediumCard;