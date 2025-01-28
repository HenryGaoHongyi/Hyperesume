package com.hyperesume.mapper;

import com.hyperesume.model.SysMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PermissionMapper {
    // Fetch all permissions
    List<SysMenu> findAll();

    // Fetch permissions by userId
    List<SysMenu> findByUserId(@Param("userId") Long userId);
}