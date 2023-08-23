import {
    SettingsBlock,
    StreamCoreBtn,
    StreamCoreInput,
    StreamDropdown,
    StreamOption,
    StreamOptionList,
    StreamSelect
} from "@/entities/stream";
import React, { useRef, useState } from "react";
import { Description } from "./Shared";
import { handleGetCategories } from "../../model/actions";
import { handleError } from "@/shared/utils";
import is from "sharp/lib/is";

export const StreamInfo = ({ userID, profileSettings }) => {
    const { data, isError, isLoading, error } = handleGetCategories();
    const currCat = useRef(profileSettings?.next_stream_category);
    const currTitle = useRef(profileSettings?.next_stream_title);

    const handleSelectCat = (value) => {
        currCat.current = value;
    };

    const handleChangeTitle = (value) => {
        currTitle.current = value;
    };

    return (
        <form>
            <SettingsBlock
                title="Stream title"
                action={
                    <TitleField
                        title={profileSettings?.next_stream_title}
                        onChange={handleChangeTitle}
                    />
                }
                description={<TitleFieldDescription />}
            />
            <SettingsBlock
                title="Stream category"
                action={
                    <CatField
                        currentCatId={profileSettings?.next_stream_category}
                        onSelect={handleSelectCat}
                        categories={data || []}
                        isError={isError}
                        isLoading={isLoading}
                        error={error}
                    />
                }
                description={<CategoryFieldDescription />}
            />
            <StreamCoreBtn
                className={"px-2 py-1.5"}
                // type="submit"
            >
                Save changes
            </StreamCoreBtn>
        </form>
    );
};

function TitleField({ title }) {
    return (
        <div className="stream-settings-field">
            <div className="stream-settings-field-wrapper">
                <StreamCoreInput value={title} />
            </div>
        </div>
    );
}
function CatField({ categories, onSelect, currentCatId, isError, error, isLoading }) {
    const [currentCat, setCurrentCat] = useState(() => {
        const catTitle = categories.find((item) => item?.id === currentCatId)?.title;
        return catTitle;
    });

    const handleSelect = (value) => {
        // Server expects category id, but user should see title value
        const catId = categories.find((cat) => cat.title == value).id;
        onSelect(catId);
        setCurrentCat(value);
    };
    console.log(categories);
    return (
        <div className="stream-settings-field">
            <div className="stream-settings-field-wrapper">
                <StreamDropdown
                    currentValue={currentCat || "None"}
                    isError={isError}
                    isLoading={isLoading}
                    error={handleError(error).message}
                    optionList={
                        <StreamOptionList>
                            {categories.map((cat) => (
                                <StreamOption
                                    value={cat.title}
                                    thumbnailSrc={cat.category_img}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </StreamOptionList>
                    }
                />
            </div>
        </div>
    );
}

function TitleFieldDescription() {
    return (
        <Description>
            <p>Your stream title that will be visible to other users when you go live.</p>
        </Description>
    );
}

function CategoryFieldDescription() {
    return (
        <Description>
            <p>Categorize your next stream to help users find you faster.</p>
        </Description>
    );
}
