package com.hyperesume.mapper;

import com.hyperesume.model.Education;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EducationMapper {

    @Select("SELECT * FROM education WHERE resume_id = #{resumeId}")
    List<Education> findByResumeId(@Param("resumeId") Long resumeId);

    @Insert("INSERT INTO education (resume_id, institution, graduation_date, degree) " +
            "VALUES (#{resumeId}, #{institution}, #{graduationDate}, #{degree})")
    void insertEducation(Education education);

    @Delete("DELETE FROM education WHERE education_id = #{educationId}")
    void deleteEducation(@Param("educationId") Long educationId);
}
