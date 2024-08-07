"use client"

import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
    onSearch: (value: string) => void;
    placeholder?: string;
};

export function SearchHeader({ onSearch, placeholder }: Props) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <div className="max-w-[300px]">
            <Input
                placeholder={placeholder || "Search..."}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
                suffix={<SearchOutlined onClick={() => handleSearch(searchValue)} />}
            />
        </div>
    );
}
