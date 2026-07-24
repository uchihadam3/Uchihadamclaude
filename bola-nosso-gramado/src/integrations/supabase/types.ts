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
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
          username: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
          username: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      coach_progress: {
        Row: {
          created_at: string
          earned_xp: number
          unlocked: Json
          updated_at: string
          user_id: string
          xp_history: Json
          xp_multiplier: number
        }
        Insert: {
          created_at?: string
          earned_xp?: number
          unlocked?: Json
          updated_at?: string
          user_id: string
          xp_history?: Json
          xp_multiplier?: number
        }
        Update: {
          created_at?: string
          earned_xp?: number
          unlocked?: Json
          updated_at?: string
          user_id?: string
          xp_history?: Json
          xp_multiplier?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      save_records_archive: {
        Row: {
          archived_at: string | null
          created_at: string
          display_name: string
          game_state: Json
          id: string
          mode: string
          save_id: string | null
          score: number
          season: number
          stats: Json
          team_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          display_name: string
          game_state: Json
          id?: string
          mode?: string
          save_id?: string | null
          score?: number
          season?: number
          stats?: Json
          team_name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          display_name?: string
          game_state?: Json
          id?: string
          mode?: string
          save_id?: string | null
          score?: number
          season?: number
          stats?: Json
          team_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      save_slots: {
        Row: {
          created_at: string
          display_name: string
          game_state: Json
          id: string
          mode: string
          score: number
          season: number
          slot_index: number
          stats: Json
          team_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          game_state: Json
          id?: string
          mode?: string
          score?: number
          season?: number
          slot_index: number
          stats?: Json
          team_name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          game_state?: Json
          id?: string
          mode?: string
          score?: number
          season?: number
          slot_index?: number
          stats?: Json
          team_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          formation: string
          id: string
          kind: string
          save_id: string | null
          season: number | null
          style: string
          team_name: string | null
          unlocked_at: string
          user_id: string
        }
        Insert: {
          badge_key: string
          formation: string
          id?: string
          kind: string
          save_id?: string | null
          season?: number | null
          style: string
          team_name?: string | null
          unlocked_at?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          formation?: string
          id?: string
          kind?: string
          save_id?: string | null
          season?: number | null
          style?: string
          team_name?: string | null
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_title_events: {
        Row: {
          awarded_at: string
          competition: string
          id: string
          place: number
          save_id: string | null
          season: number
          user_id: string
        }
        Insert: {
          awarded_at?: string
          competition: string
          id?: string
          place: number
          save_id?: string | null
          season: number
          user_id: string
        }
        Update: {
          awarded_at?: string
          competition?: string
          id?: string
          place?: number
          save_id?: string | null
          season?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_account_ranking: {
        Args: { p_limit?: number }
        Returns: {
          brasileirao_1: number
          brasileirao_2: number
          brasileirao_3: number
          libertadores_1: number
          libertadores_2: number
          libertadores_3: number
          mundial_1: number
          mundial_2: number
          mundial_3: number
          sulamericana_1: number
          sulamericana_2: number
          sulamericana_3: number
          total_score: number
          user_id: string
          username: string
        }[]
      }
      get_badge_ranking: {
        Args: { p_limit?: number }
        Returns: {
          badge_count: number
          badges: Json
          user_id: string
          username: string
        }[]
      }
      get_public_ranking: {
        Args: { p_limit?: number; p_mode?: string }
        Returns: {
          created_at: string
          display_name: string
          game_state: Json
          id: string
          mode: string
          score: number
          season: number
          stats: Json
          team_name: string
          updated_at: string
          username: string
        }[]
      }
      get_records_ranking: {
        Args: { p_limit?: number }
        Returns: {
          created_at: string
          display_name: string
          game_state: Json
          id: string
          mode: string
          score: number
          season: number
          stats: Json
          team_name: string
          updated_at: string
          username: string
        }[]
      }
      get_user_badges_by_username: {
        Args: { p_username: string }
        Returns: {
          badge_key: string
          formation: string
          kind: string
          season: number
          style: string
          team_name: string
          unlocked_at: string
        }[]
      }
      get_user_ranking: {
        Args: { p_limit?: number }
        Returns: {
          best_score: number
          slot_count: number
          slots: Json
          total_score: number
          user_id: string
          username: string
        }[]
      }
      is_display_name_taken: { Args: { p_name: string }; Returns: boolean }
      is_username_taken: { Args: { p_name: string }; Returns: boolean }
      sync_title_events: { Args: { p_events: Json }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
