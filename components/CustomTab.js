import * as React from "react";
import { styled } from "@mui/system";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

export const CustomTab = styled(TabUnstyled)`
    font-family: Poppins, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 10px 12px;
    margin: 4px 4px;
    border: none;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: #3d3d3d;
    }

    &:focus {
        color: #fff;
        border-radius: 3px;
        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        background-color: #fff;
        color: #0f0f0f;
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const CustomTabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

export const CustomTabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background-color: #0f0f0f;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
`;
