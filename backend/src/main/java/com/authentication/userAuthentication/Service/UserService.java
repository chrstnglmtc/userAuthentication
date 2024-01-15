package com.authentication.userAuthentication.Service;

import java.util.List;

import com.authentication.userAuthentication.Dto.LoginDto;
import com.authentication.userAuthentication.Dto.UserDto;
import com.authentication.userAuthentication.Response.LoginMessage;

public interface UserService {

    String addUser(UserDto userDto);
    void updateUser(UserDto updatedUserDto);
    LoginMessage loginUser(LoginDto loginDto);
    UserDto findUserById(Long userId);
    List<UserDto> getAllUsers();
    UserDto findUserByEmail(String email);
}
