export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          booking_id: string | null
          created_at: string
          field: string | null
          id: string
          new_value: string | null
          old_value: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          booking_id?: string | null
          created_at?: string
          field?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          booking_id?: string | null
          created_at?: string
          field?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      availability_rules: {
        Row: {
          end_minute: number
          id: string
          start_minute: number
          weekday: number
        }
        Insert: {
          end_minute: number
          id?: string
          start_minute: number
          weekday: number
        }
        Update: {
          end_minute?: number
          id?: string
          start_minute?: number
          weekday?: number
        }
        Relationships: []
      }
      blocked_periods: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          reason: string | null
          starts_at: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          reason?: string | null
          starts_at: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          reason?: string | null
          starts_at?: string
        }
        Relationships: []
      }
      booking_settings: {
        Row: {
          buffer_minutes: number
          daily_max_jobs: number
          id: number
          max_advance_days: number
          min_lead_hours: number
          slot_minutes: number
        }
        Insert: {
          buffer_minutes?: number
          daily_max_jobs?: number
          id?: number
          max_advance_days?: number
          min_lead_hours?: number
          slot_minutes?: number
        }
        Update: {
          buffer_minutes?: number
          daily_max_jobs?: number
          id?: number
          max_advance_days?: number
          min_lead_hours?: number
          slot_minutes?: number
        }
        Relationships: []
      }
      bookings: {
        Row: {
          after_photo_url: string | null
          amount_paid_kes: number | null
          area: string
          assigned_worker: string | null
          before_photo_url: string | null
          booking_reference: string | null
          created_at: string
          customer_confirmation_note: string | null
          details: string | null
          email: string | null
          ends_at: string
          estimated_price_kes: number | null
          final_price_kes: number | null
          id: string
          internal_notes: string | null
          job_completed_at: string | null
          job_started_at: string | null
          mpesa_receipt_code: string | null
          name: string
          payment_method: string | null
          payment_notes: string | null
          payment_received_at: string | null
          payment_receiver: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          phone: string
          property_type: string | null
          service: Database["public"]["Enums"]["service_type"]
          starts_at: string
          status: Database["public"]["Enums"]["booking_status"]
          whatsapp: string | null
        }
        Insert: {
          after_photo_url?: string | null
          amount_paid_kes?: number | null
          area: string
          assigned_worker?: string | null
          before_photo_url?: string | null
          booking_reference?: string | null
          created_at?: string
          customer_confirmation_note?: string | null
          details?: string | null
          email?: string | null
          ends_at: string
          estimated_price_kes?: number | null
          final_price_kes?: number | null
          id?: string
          internal_notes?: string | null
          job_completed_at?: string | null
          job_started_at?: string | null
          mpesa_receipt_code?: string | null
          name: string
          payment_method?: string | null
          payment_notes?: string | null
          payment_received_at?: string | null
          payment_receiver?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone: string
          property_type?: string | null
          service: Database["public"]["Enums"]["service_type"]
          starts_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          whatsapp?: string | null
        }
        Update: {
          after_photo_url?: string | null
          amount_paid_kes?: number | null
          area?: string
          assigned_worker?: string | null
          before_photo_url?: string | null
          booking_reference?: string | null
          created_at?: string
          customer_confirmation_note?: string | null
          details?: string | null
          email?: string | null
          ends_at?: string
          estimated_price_kes?: number | null
          final_price_kes?: number | null
          id?: string
          internal_notes?: string | null
          job_completed_at?: string | null
          job_started_at?: string | null
          mpesa_receipt_code?: string | null
          name?: string
          payment_method?: string | null
          payment_notes?: string | null
          payment_received_at?: string | null
          payment_receiver?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string
          property_type?: string | null
          service?: Database["public"]["Enums"]["service_type"]
          starts_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          whatsapp?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_booking_request: {
        Args: {
          _area: string
          _details: string
          _email: string
          _ends_at: string
          _name: string
          _phone: string
          _property_type: string
          _service: string
          _starts_at: string
          _whatsapp: string
        }
        Returns: {
          booking_reference: string
          id: string
        }[]
      }
      get_busy_slots: {
        Args: { _from: string; _to: string }
        Returns: {
          ends_at: string
          starts_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      next_booking_reference: { Args: { _for_date: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status:
        | "requested"
        | "confirmed"
        | "declined"
        | "completed"
        | "cancelled"
      payment_status: "unpaid" | "deposit_paid" | "paid" | "cancelled"
      service_type:
        | "turnover"
        | "deep_clean"
        | "urine_odor"
        | "emergency"
        | "upholstery"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      booking_status: [
        "requested",
        "confirmed",
        "declined",
        "completed",
        "cancelled",
      ],
      payment_status: ["unpaid", "deposit_paid", "paid", "cancelled"],
      service_type: [
        "turnover",
        "deep_clean",
        "urine_odor",
        "emergency",
        "upholstery",
        "other",
      ],
    },
  },
} as const
