import React from 'react';
import { SearchHeader } from './SearchHeader';

type Props = {
    onSearch: (value: string) => void;
    placeholder?: string
};

export function TableFilterHeader({ onSearch, placeholder }: Props) {

    const handleSearch = (value: string) => {
        onSearch(value);
    };

    return (
        <div className="my-2">
            <SearchHeader onSearch={handleSearch} placeholder={placeholder} />

        </div>
    );
}
