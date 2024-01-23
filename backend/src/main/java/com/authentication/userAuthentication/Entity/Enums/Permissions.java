package com.authentication.userAuthentication.Entity.Enums;

public enum Permissions {
    STUDENT_READ("student:read"),
    STUDENT_UPDATE("student:update"),
    STUDENT_DELETE("student:delete"),
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_CREATE("admin:create");

    private final String permission;

    private Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }    
}
