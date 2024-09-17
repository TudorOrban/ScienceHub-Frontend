import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";
import StandardLabelValues from "@/shared/common/components/simple/StandardLabelValues";

export interface UserDetailsPanelProps {
    result?: Result<UserDetailsDTO>;
}

const UserDetailsPanel = ({ result }: UserDetailsPanelProps) => {
    return (
        <div className="min-w-40 max-w-80 p-4 space-y-4 bg-gray-50 border-l border-b border-gray-300 rounded-bl-md shadow-sm">
            <StandardLabelValues label="Qualifications:" values={result?.data?.userDetails?.qualifications} hideUndefined={true} />
            <StandardLabelValues label="Affiliations:" values={result?.data?.userDetails?.affiliations} hideUndefined={true} />
            <StandardLabelValues label="Research Interests:" values={result?.data?.userDetails?.researchInterests} hideUndefined={true} />
            <StandardLabelValues label="Education:" values={result?.data?.userDetails?.education} hideUndefined={true} />
            <StandardLabelValues label="Contact Information:" values={result?.data?.userDetails?.contactInformation} hideUndefined={true} />
            <StandardLabelValues label="Social Media:" values={result?.data?.userDetails?.socialMediaLinks} hideUndefined={true} />
        </div>
    );
};

export default UserDetailsPanel;