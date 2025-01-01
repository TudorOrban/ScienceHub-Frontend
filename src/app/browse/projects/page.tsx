"use client";

import SearchInput from "@/shared/common/components/SearchInput";

export default function BrowseProjects() {
    return (
        <div className="h-full overflow-y">
            {/* Header */}
            <div className="flex flex-col items-center justify-center h-64 space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Browse Projects 
                </h2>

                <SearchInput searchTerm="" placeholder="Search Projects" className="w-96" onTermChange={() => {}}/>
            </div>

            {/* Results */}
            <div>

            </div>
        </div>
    );
}
