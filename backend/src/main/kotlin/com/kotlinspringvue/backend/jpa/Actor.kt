package com.kotlinspringvue.backend.jpa

import javax.persistence.*

@Entity
@Table(name = "actors")
data class Actor (

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = 0,

    @Column(name="first_name")
    var firstName: String?=null,

    @Column(name="last_name")
    var lastName: String?=null,

    @Column(name="email")
    var email: String?=null,

    @Column(name="phone_number")
    var phoneNumber: String?=null,

)