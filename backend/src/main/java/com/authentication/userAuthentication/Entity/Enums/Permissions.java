package com.authentication.userAuthentication.Entity.Enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permissions {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    STUDENT_READ("student:read"),
    STUDENT_UPDATE("student:update"),
    STUDENT_CREATE("student:create"),
    STUDENT_DELETE("student:delete")

    ;

    @Getter
    private final String permission;
}

// public enum Permissions {
//     STUDENT_READ("student:read"),
//     STUDENT_UPDATE("student:update"),
//     ADMIN_READ("admin:read"),
//     ADMIN_UPDATE("admin:update"),
//     ADMIN_DELETE("admin:delete"),
//     ADMIN_CREATE("admin:create");

//     private final String permission;

//     private Permissions(String permission) {
//         this.permission = permission;
//     }

//     public String getPermission() {
//         return permission;
//     }    
// }
