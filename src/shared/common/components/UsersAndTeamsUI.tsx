import { UserSmall } from "@/core/user/models/User";
import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";
import Link from "next/link";

export interface UsersAndTeamsUIProps {
    users?: UserSmall[];
    collaborations?: CollaborationSmall[];
    small?: boolean;
}

const UsersAndCollaborationsUI = ({
    users,
    collaborations,
    small = false,
}: UsersAndTeamsUIProps) => {
    return (
        <div className="flex flex-wrap space-x-1">
            {(users || [])
                .filter((_, index) => small ? index < 3 : index < 20)
                .map((user, index) => (
                    <Link
                        key={index}
                        href={`/${user.username}/overview`}
                        className="pseudo-link block"
                    >
                        {user.fullName}
                        {((index !== (users || []).length - 1) || collaborations?.length) ? ", " : ""}
                    </Link>
                )
            )}
            {(collaborations || [])
                .filter((_, index) => small ? index < 3 : index < 20)
                .map((collaboration, index) => (
                    <Link
                        key={index}
                        href={`/${collaboration.name}/overview`}
                        className="pseudo-link block"
                    >
                        {index !== (collaborations || []).length ? ", " : ""}
                        {collaboration.name}
                    </Link>
                )
            )}
        </div>
    );
}

export default UsersAndCollaborationsUI;