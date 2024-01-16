package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Dto.LoginDto;
import com.authentication.userAuthentication.Dto.UserDto;
import com.authentication.userAuthentication.Response.LoginMessage;

public interface UserService {

    String addUser(UserDto userDto);
    LoginMessage loginUser(LoginDto loginDto);
}
