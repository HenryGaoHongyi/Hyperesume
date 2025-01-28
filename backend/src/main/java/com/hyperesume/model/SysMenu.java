package com.hyperesume.model;

public class SysMenu {

    private Integer menuId; // Corresponds to Sys_menu.menu_id
    private String menuName; // Corresponds to Sys_menu.menu_name
    private String description; // Corresponds to Sys_menu.description
    private String url; // Corresponds to Sys_menu.url

    // Constructors
    public SysMenu() {}

    public SysMenu(Integer menuId, String menuName, String description, String url) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.description = description;
        this.url = url;
    }

    // Getters and Setters
    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}