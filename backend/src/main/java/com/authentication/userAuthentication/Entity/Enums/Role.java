package com.authentication.userAuthentication.Entity.Enums;

public enum Role {
        ADMIN("admin"),
        STUDENT("student");
      
        private String role;
      
        Role(String role) {
          this.role = role;
        }
      
        public String getValue() {
          return role;
        }
}
